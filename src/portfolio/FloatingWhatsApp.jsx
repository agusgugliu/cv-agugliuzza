import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WA_NUMBER = '34610010576';

/* Fixed bottom-right WhatsApp button (+34), appears after the user scrolls.
   Opens wa.me with a language-aware prefilled greeting. */
const FloatingWhatsApp = ({ lang }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const onScroll = () => setShow(window.scrollY > 400);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const text = lang === 'es'
        ? 'Hola Agustín, vi tu portfolio y me gustaría conectar.'
        : 'Hi Agustín, I saw your portfolio and would like to connect.';
    const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    const label = lang === 'es' ? 'Escribir por WhatsApp' : 'Message on WhatsApp';

    return (
        <AnimatePresence>
            {show && (
                <motion.a
                    className="pm-fab-whatsapp"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    title={label}
                    initial={{ opacity: 0, scale: 0.8, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 12 }}
                    transition={{ duration: 0.25 }}
                >
                    <MessageCircle size={22} />
                </motion.a>
            )}
        </AnimatePresence>
    );
};

export default FloatingWhatsApp;
