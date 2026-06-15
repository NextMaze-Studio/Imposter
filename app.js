const { useState, useEffect, useRef } = React;
const { motion, AnimatePresence, useInView } = FramerMotion;

/* ==========================================================================
   A. THE WORD TEXT SEQUENCER LOGIC (TYPEWRITER CORE ENGINE)
   ========================================================================== */
function useTypewriterEngine(words, typeSpeed = 100, eraseSpeed = 50, delay = 2000) {
    const [currentText, setCurrentText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timer;
        const activeWord = words[wordIndex];

        if (isDeleting) {
            timer = setTimeout(() => {
                setCurrentText(activeWord.substring(0, currentText.length - 1));
            }, eraseSpeed);
        } else {
            timer = setTimeout(() => {
                setCurrentText(activeWord.substring(0, currentText.length + 1));
            }, typeSpeed);
        }

        if (!isDeleting && currentText === activeWord) {
            timer = setTimeout(() => setIsDeleting(true), delay);
        } else if (isDeleting && currentText === "") {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
        }

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, wordIndex, words]);

    return currentText;
}

/* ==========================================================================
   B. THE SCROLL-TRIGGER NUMERICAL COUNTER COMPONENT
   ========================================================================== */
function MetricCounter({ targetValue }) {
    const [count, setCount] = useState(0);
    const elementRef = useRef(null);
    const isElementInView = useInView(elementRef, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isElementInView) {
            let start = 0;
            const duration = 2000; 
            const intervalTime = Math.floor(duration / targetValue);
            
            const counterTimer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start >= targetValue) {
                    clearInterval(counterTimer);
                }
            }, intervalTime);
            return () => clearInterval(counterTimer);
        }
    }, [isElementInView, targetValue]);

    return React.createElement('span', { ref: elementRef }, `${count}%`);
}

/* ==========================================================================
   C. MAIN APPLICATION LAYOUT STRUCTURE
   ========================================================================== */
function App() {
    const [activePipelineStep, setActivePipelineStep] = useState(0);
    const phrases = ["one platform.", "automated flows.", "live metrics."];
    const dynamicTypedPhrase = useTypewriterEngine(phrases);

    // Auto loop canvas tracking layers if left untouched
    useEffect(() => {
        const stepTimer = setInterval(() => {
            setActivePipelineStep((prev) => (prev + 1) % 3);
        }, 5000);
        return () => clearInterval(stepTimer);
    }, []);

    return React.createElement('div', { className: 'min-h-screen relative' },
        
        // 1. GLOBAL NAVIGATION REGION
        React.createElement('header', { className: 'fixed w-full top-0 left-0 flex justify-between items-center px-[8%] py-5 bg-darkBg/70 backdrop-blur-xl border-b border-white/5 z-50' },
            React.createElement('div', { className: 'flex items-center gap-3 text-lg font-bold tracking-tight' },
                React.createElement('div', { className: 'w-6 h-6 border-2 border-neonTeal rounded-md shadow-[0_0_12px_rgba(0,240,255,0.2)]' }),
                'Spindice'
            ),
            React.createElement('nav', null,
                React.createElement('ul', { className: 'flex gap-8 text-sm font-medium text-textGray' },
                    React.createElement('li', null, React.createElement('a', { href: '#features', className: 'hover:text-white transition-colors' }, 'Features')),
                    React.createElement('li', null, React.createElement('a', { href: '#canvas', className: 'hover:text-white transition-colors' }, 'Canvas')),
                    React.createElement('li', null, React.createElement('a', { href: '#metrics', className: 'hover:text-white transition-colors' }, 'Metrics'))
                )
            ),
            React.createElement('div', { className: 'flex items-center gap-4' },
                React.createElement('a', { href: '#', className: 'text-sm font-semibold hover:text-white transition-colors' }, 'Log In'),
                React.createElement('a', { href: '#', className: 'bg-white text-darkBg text-sm font-semibold px-4 py-2 rounded-lg hover:bg-neonTeal transition-colors duration-300' }, 'Get Started')
            )
        ),

        // 2. HERO INTERACTION AREA (THE MAIN DISPLAY HERO VIEW)
        React.createElement('section', { className: 'relative pt-40 pb-24 px-[8%] flex flex-col items-center text-center justify-center min-h-screen bg-[radial-gradient(circle_at_50%_-20%,rgba(0,240,255,0.12)_0%,rgba(3,7,18,1)_60%)]' },
            
            // Motion Pill Component
            React.createElement(motion.div, { 
                initial: { opacity: 0, y: -15 }, 
                animate: { opacity: 1, y: 0 }, 
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                className: 'inline-flex items-center gap-2 bg-white/5 border border-white/5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-slate-300 mb-8' 
            },
                React.createElement('i', { className: 'fa-solid fa-bolt text-neonTeal' }),
                'Framer Motion Framework Live'
            ),

            // Heading Segment
            React.createElement(motion.h1, {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
                className: 'text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-[1.1] mb-6'
            },
                'Manage operations smarter with ',
                React.createElement('br'),
                React.createElement('span', { className: 'text-neonTeal cursor-blink' }, dynamicTypedPhrase)
            ),

            React.createElement(motion.p, {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
                className: 'text-textGray text-lg max-w-xl leading-relaxed mb-10'
            },
                'Design, configure, and orchestrate complex operational interfaces and analytical tracking sequences without resource debt.'
            ),

            // THE INTERACTIVE CANVAS CONTAINER
            React.createElement(motion.div, {
                id: 'canvas',
                initial: { opacity: 0, y: 40 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
                className: 'w-full max-w-5xl bg-surfaceCard border border-white/5 rounded-2xl shadow-panel-heavy grid grid-cols-1 md:grid-cols-[260px_1fr] h-[520px] overflow-hidden text-left'
            },
                // Interactive Selection Panel Sidebar
                React.createElement('div', { className: 'bg-black/20 border-r border-white/5 p-6 flex flex-col gap-2' },
                    React.createElement('div', { className: 'text-[11px] font-bold text-textGray uppercase tracking-widest mb-4' }, 'Pipeline Topology'),
                    [
                        { title: 'Ingestion Track', icon: 'fa-database' },
                        { title: 'Transformation Rule', icon: 'fa-filter' },
                        { title: 'Production Event', icon: 'fa-paper-plane' }
                    ].map((item, idx) => 
                        React.createElement('div', {
                            key: idx,
                            onClick: () => setActivePipelineStep(idx),
                            className: `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${activePipelineStep === idx ? 'text-white bg-white/5 border-l-2 border-neonTeal pl-3' : 'text-textGray hover:text-white hover:bg-white/5'}`
                        },
                            React.createElement('i', { className: `fa-solid ${item.icon} ${activePipelineStep === idx ? 'text-neonTeal' : ''}` }),
                            item.title
                        )
                    )
                ),

                // SVG Drawing Vector Grid Stage Workspace
                React.createElement('div', { className: 'relative p-10 flex items-center justify-between overflow-hidden' },
                    React.createElement('svg', { className: 'absolute inset-0 w-full h-full pointer-events-none z-0' },
                        React.createElement('path', {
                            d: 'M 220 230 L 380 230',
                            fill: 'none',
                            stroke: activePipelineStep >= 1 ? '#00f0ff' : 'rgba(255,255,255,0.05)',
                            strokeWidth: '2',
                            className: activePipelineStep >= 1 ? 'active-svg-dash' : '',
                            style: { transition: 'stroke 0.5s ease' }
                        }),
                        React.createElement('path', {
                            d: 'M 440 230 L 600 230',
                            fill: 'none',
                            stroke: activePipelineStep >= 2 ? '#00f0ff' : 'rgba(255,255,255,0.05)',
                            strokeWidth: '2',
                            className: activePipelineStep >= 2 ? 'active-svg-dash' : '',
                            style: { transition: 'stroke 0.5s ease' }
                        })
                    ),

                    // Mapping Visual Node Boxes
                    [
                        { h: 'Source Feed', p: 'API Webhook Logs', icon: 'fa-database' },
                        { h: 'Data Mapping', p: 'Structural Cleanse', icon: 'fa-filter' },
                        { h: 'Telemetry Dispatch', p: 'Live App Streams', icon: 'fa-paper-plane' }
                    ].map((node, idx) => 
                        React.createElement('div', {
                            key: idx,
                            className: `relative z-10 w-48 bg-darkBg border p-6 rounded-xl text-center transition-all duration-700 ease-fluid-bounce ${activePipelineStep === idx ? 'border-neonTeal opacity-100 scale-100 shadow-[0_0_30px_rgba(0,240,255,0.15)]' : 'border-white/5 opacity-40 scale-95'}`
                        },
                            React.createElement('div', { className: 'w-12 h-12 bg-surfaceCard rounded-lg flex items-center justify-center mx-auto mb-4 border border-white/5' },
                                React.createElement('i', { className: `fa-solid ${node.icon} text-xl ${activePipelineStep === idx ? 'text-neonTeal' : 'text-textGray'}` })
                            ),
                            React.createElement('h4', { className: 'text-sm font-bold text-white mb-1' }, node.h),
                            React.createElement('p', { className: 'text-[12px] text-textGray' }, node.p)
                        )
                    )
                )
            )
        ),

        // 3. FEATURE ARCHITECTURE ROW (VIEWPORT TRIGGERED SHOWCASE)
        React.createElement('section', { id: 'features', className: 'py-32 px-[8%] border-t border-white/5 relative z-20' },
            React.createElement('div', { className: 'text-center max-w-2xl mx-auto mb-20' },
                React.createElement('h2', { className: 'text-3xl md:text-4xl font-extrabold tracking-tight' },
                    'Stop patching legacy scripts. Build ',
                    React.createElement('span', { className: 'text-neonTeal' }, 'resilient tracking grids.')
                )
            ),

            React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-6' },
                [
                    { title: 'Deterministic Runtimes', desc: 'Isolate task execution tracks instantly to guarantee pipeline stability across active cloud nodes.', icon: 'fa-bolt' },
                    { title: 'Telemetry Overlays', desc: 'Observe internal variables change structures visually in production environments as they fire.', icon: 'fa-eye' },
                    { title: 'Cluster Extensibility', desc: 'Expand foundational matrix units across horizontally scalable worker platforms dynamically.', icon: 'fa-cubes' }
                ].map((card, idx) => 
                    React.createElement(motion.div, {
                        key: idx,
                        initial: { opacity: 0, y: 30 },
                        whileInView: { opacity: 1, y: 0 },
                        viewport: { once: true, margin: "-100px" },
                        transition: { duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] },
                        className: 'bg-surfaceCard border border-white/5 p-8 rounded-xl relative overflow-hidden group hover:border-cyan-500/30 transition-colors duration-300'
                    },
                        React.createElement('i', { className: `fa-solid ${card.icon} text-2xl text-neonTeal mb-6 block` }),
                        React.createElement('h3', { className: 'text-lg font-bold mb-3 text-slate-100' }, card.title),
                        React.createElement('p', { className: 'text-textGray text-sm leading-relaxed' }, card.desc)
                    )
                )
            )
        ),

        // 4. METRIC PERFORMANCE ZONE (SCROLL AUTO-COUNTER)
        React.createElement('section', { id: 'metrics', className: 'py-32 px-[8%] bg-[#02050e] border-t border-white/5' },
            React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto' },
                
                React.createElement(motion.div, {
                    initial: { opacity: 0, x: -30 },
                    whileInView: { opacity: 1, x: 0 },
                    viewport: { once: true },
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                },
                    React.createElement('div', { className: 'inline-flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase text-cyan-400 mb-4' },
                        React.createElement('i', { className: 'fa-solid fa-chart-pie' }),
                        'Telemetry Assessment'
                    ),
                    React.createElement('h2', { className: 'text-3xl font-extrabold mb-4' }, 'Engineered for intense operational loads'),
                    React.createElement('p', { className: 'text-textGray text-sm leading-relaxed' }, 'Centralize processing pipelines. Maximize resource utilization vectors cleanly without needing complex database tracking adjustments or manual oversight panels.')
                ),

                // Data Metric Dashboard Block Element tracking entrance variables
                React.createElement(motion.div, {
                    initial: { opacity: 0, scale: 0.95 },
                    whileInView: { opacity: 1, scale: 1 },
                    viewport: { once: true },
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                    className: 'bg-surfaceCard border border-white/5 p-10 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-8 relative'
                },
                    // Metric 01: Horizontal Growth Bar Indicator
                    React.createElement('div', { className: 'flex flex-col' },
                        React.createElement('div', { className: 'text-4xl font-extrabold mb-1' }, 
                            React.createElement(MetricCounter, { targetValue: 89 })
                        ),
                        React.createElement('div', { className: 'text-xs font-semibold text-textGray' }, 'Workflow Optimization Vector'),
                        React.createElement('div', { className: 'h-1.5 w-full bg-white/5 rounded-full mt-4 overflow-hidden' },
                            React.createElement(motion.div, {
                                initial: { width: 0 },
                                whileInView: { width: '89%' },
                                viewport: { once: true },
                                transition: { duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
                                className: 'h-full bg-neonTeal rounded-full'
                            })
                        )
                    ),

                    // Metric 02: SVG Path Arc Circle
                    React.createElement('div', { className: 'flex items-center gap-4' },
                        React.createElement('svg', { className: 'w-16 h-16 transform -rotate-90' },
                            React.createElement('circle', { cx: '32', cy: '32', r: '28', className: 'stroke-white/5 fill-none', strokeWidth: '4' }),
                            React.createElement(motion.circle, { 
                                cx: '32', cy: '32', r: '28', 
                                className: 'stroke-neonTeal fill-none', 
                                strokeWidth: '4',
                                strokeDasharray: '176',
                                initial: { strokeDashoffset: '176' },
                                whileInView: { strokeDashoffset: String(176 - (176 * 82) / 100) },
                                viewport: { once: true },
                                transition: { duration: 1.5, delay: 0.3, ease: 'easeOut' },
                                strokeLinecap: 'round'
                            })
                        ),
                        React.createElement('div', null,
                            React.createElement('div', { className: 'text-3xl font-extrabold' }, 
                                React.createElement(MetricCounter, { targetValue: 82 })
                            ),
                            React.createElement('div', { className: 'text-xs font-semibold text-textGray' }, 'Active Team Adoption')
                        )
                    )
                )

            )
        )

    );
}

// Global Mount Execution Trigger
const containerRoot = ReactDOM.createRoot(document.getElementById('root'));
containerRoot.render(React.createElement(App));
