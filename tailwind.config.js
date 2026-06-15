tailwind.config = {
    theme: {
        extend: {
            colors: {
                darkBg: '#030712',       /* Premium Onyx Background */
                surfaceCard: '#0b1329',  /* High-contrast dashboard container tint */
                neonTeal: '#00f0ff',     /* Brand Active Indicator Accent */
                textGray: '#64748b'      /* Subdued UI typography scale */
            },
            fontFamily: {
                sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif']
            },
            boxShadow: {
                'glow-teal': '0 0 24px rgba(0, 240, 255, 0.15)',
                'panel-heavy': '0 40px 100px rgba(0, 0, 0, 0.6)'
            },
            transitionTimingFunction: {
                'fluid-bounce': 'cubic-bezier(0.16, 1, 0.3, 1)'
            }
        }
    }
}
