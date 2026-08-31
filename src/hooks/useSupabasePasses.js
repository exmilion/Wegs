import { useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const REFRESH_INTERVAL = 60_000

// ── Mapeo compartido (fetch inicial + append local) ──
function mapPass(row) {
    return {
        id: row.id,
        satellite: row.satellite,
        timestamp: row.timestamp,
        folder_name: row.folder_name,
        pngCount: row.png_count || 0,
        rawCount: row.raw_count || 0,
        filledCount: row.filled_count || 0,
        status: row.status || 'completed',
        images: (row.pass_images || []).map((img) => ({
            id: img.id,
            type: img.type,
            label: img.label || getLabelForType(img.type),
            image_url: img.image_url,
            thumbnail_url: img.thumbnail_url || img.image_url,
        })),
    }
}

export default function useSupabasePasses() {
    const [passes, setPasses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchPasses = useCallback(async () => {
        if (!isSupabaseConfigured()) {
            setPasses([])
            setError('Supabase no configurado')
            setLoading(false)
            return
        }

        try {
            // CRIT #1: Solo pedir columnas necesarias de pass_images (sin pass_id, created_at)
            const { data, error: fetchError } = await supabase
                .from('passes')
                .select('*, pass_images(id, type, label, image_url, thumbnail_url)')
                .order('timestamp', { ascending: false })
                .limit(500)

            if (fetchError) throw fetchError

            const mapped = data.map(mapPass)

            setPasses(mapped)
            setError(null)
        } catch (err) {
            if (import.meta.env.DEV) console.error('Error fetching passes:', err)
            setError(err.message)
            setPasses([])
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchPasses()

        const interval = setInterval(fetchPasses, REFRESH_INTERVAL)

        let subscription
        if (isSupabaseConfigured()) {
            // CRIT #2: En vez de refetchear TODO, solo pedir el nuevo pase y agregarlo localmente
            const handleNewPass = async (payload) => {
                try {
                    const { data } = await supabase
                        .from('passes')
                        .select('*, pass_images(id, type, label, image_url, thumbnail_url)')
                        .eq('id', payload.new.id)
                        .single()

                    if (data) {
                        setPasses((prev) => [mapPass(data), ...prev].slice(0, 500))
                    }
                } catch (err) {
                    // Si falla el append local, refetch completo como fallback
                    if (import.meta.env.DEV) console.error('Realtime append failed, full refetch:', err)
                    fetchPasses()
                }
            }

            subscription = supabase
                .channel('passes-realtime')
                .on(
                    'postgres_changes',
                    { event: 'INSERT', schema: 'public', table: 'passes' },
                    handleNewPass
                )
                .subscribe()
        }

        return () => {
            clearInterval(interval)
            if (subscription) {
                supabase.removeChannel(subscription)
            }
        }
    }, [fetchPasses])

    return { passes, loading, error }
}

function getLabelForType(type) {
    switch (type) {
        case 'FILLED': return 'MCIR Map'
        case 'RAW': return 'MSU-MR Canal 2'
        case 'STANDARD': return 'Estándar'
        default: return type
    }
}
