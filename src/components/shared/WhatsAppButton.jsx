import { MessageCircleMore } from 'lucide-react'
import { useStore } from '../../context/StoreContext'
import { ui, t } from '../../data/ui'

function WhatsAppButton() {
  const { language } = useStore()
  const message = encodeURIComponent("Hello Pub's Pizza, I want to place an order.")

  return (
    <a
      href={`https://wa.me/201553981282?text=${message}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 text-sm font-black text-neutral-950 shadow-[0_16px_50px_rgba(37,211,102,0.35)] transition hover:scale-[1.02]"
    >
      <MessageCircleMore size={18} />
      <span className="hidden sm:inline">{t(language, ui.labels.whatsapp)}</span>
    </a>
  )
}

export default WhatsAppButton
