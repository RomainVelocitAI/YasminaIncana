'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Switch } from '@/components/ui/switch'

interface PublishToggleProps {
  propertyId: string
  isPublished: boolean
}

export function PublishToggle({ propertyId, isPublished }: PublishToggleProps) {
  const router = useRouter()
  const [checked, setChecked] = useState(isPublished)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = async (newValue: boolean) => {
    setChecked(newValue)
    setIsLoading(true)

    try {
      const supabase = createClient()

      const { error } = await supabase
        .from('properties')
        .update({ is_published: newValue })
        .eq('id', propertyId)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error('Error updating property:', error)
      setChecked(!newValue) // Revert on error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Switch
      checked={checked}
      onCheckedChange={handleToggle}
      disabled={isLoading}
      className="data-[state=checked]:bg-status-available"
    />
  )
}
