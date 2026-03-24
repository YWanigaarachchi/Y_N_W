import re

projects_html = """
            <!-- Project 1 -->
            <div class="glass" style="padding: 30px;">
                <div class="monitor-frame">
                    <div class="monitor-top-bar">
                        <span class="dot mac-red"></span>
                        <span class="dot mac-yellow"></span>
                        <span class="dot mac-green"></span>
                    </div>
                    <div class="monitor-screen">
                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600" alt="Project 1">
                    </div>
                </div>
                <h3 style="margin-bottom: 10px;">Distributed Hub</h3>
                <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 20px;">A distributed microservices application built with modern architecture principles.</p>
                <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                    <span style="background: rgba(0, 108, 230, 0.1); color: var(--accent-cyan); padding: 5px 10px; border-radius: 6px; font-size: 0.8rem;">Java</span>
                    <span style="background: rgba(122, 28, 163, 0.1); color: var(--accent-purple); padding: 5px 10px; border-radius: 6px; font-size: 0.8rem;">Spring Boot</span>
                </div>
                <a href="https://github.com/YWanigaarachchi" target="_blank" class="btn btn-primary" style="padding: 10px 20px; font-size: 1rem;"><i class="fa-brands fa-github"></i> View Repo</a>
            </div>
            
            <!-- Project 2 -->
            <div class="glass" style="padding: 30px;">
                <div class="monitor-frame">
                    <div class="monitor-top-bar">
                        <span class="dot mac-red"></span>
                        <span class="dot mac-yellow"></span>
                        <span class="dot mac-green"></span>
                    </div>
                    <div class="monitor-screen">
                        <img src="https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=600" alt="Project 2">
                    </div>
                </div>
                <h3 style="margin-bottom: 10px;">Waram.lk</h3>
                <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 20px;">A comprehensive web platform aimed at connecting people efficiently.</p>
                <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                    <span style="background: rgba(0, 108, 230, 0.1); color: var(--accent-cyan); padding: 5px 10px; border-radius: 6px; font-size: 0.8rem;">React</span>
                    <span style="background: rgba(122, 28, 163, 0.1); color: var(--accent-purple); padding: 5px 10px; border-radius: 6px; font-size: 0.8rem;">Node.js</span>
                </div>
                <a href="https://github.com/YWanigaarachchi" target="_blank" class="btn btn-primary" style="padding: 10px 20px; font-size: 1rem;"><i class="fa-brands fa-github"></i> View Repo</a>
            </div>
            
            <!-- Project 3 -->
            <div class="glass" style="padding: 30px;">
                <div class="monitor-frame">
                    <div class="monitor-top-bar">
                        <span class="dot mac-red"></span>
                        <span class="dot mac-yellow"></span>
                        <span class="dot mac-green"></span>
                    </div>
                    <div class="monitor-screen">
                        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600" alt="Project 3">
                    </div>
                </div>
                <h3 style="margin-bottom: 10px;">Data Analytics Dashboard</h3>
                <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 20px;">Real-time data visualization platform with interactive charts and metrics.</p>
                <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                    <span style="background: rgba(0, 108, 230, 0.1); color: var(--accent-cyan); padding: 5px 10px; border-radius: 6px; font-size: 0.8rem;">Vue.js</span>
                    <span style="background: rgba(122, 28, 163, 0.1); color: var(--accent-purple); padding: 5px 10px; border-radius: 6px; font-size: 0.8rem;">Python</span>
                </div>
                <a href="https://github.com/YWanigaarachchi" target="_blank" class="btn btn-primary" style="padding: 10px 20px; font-size: 1rem;"><i class="fa-brands fa-github"></i> View Repo</a>
            </div>

            <!-- Project 4 -->
            <div class="glass" style="padding: 30px;">
                <div class="monitor-frame">
                    <div class="monitor-top-bar">
                        <span class="dot mac-red"></span>
                        <span class="dot mac-yellow"></span>
                        <span class="dot mac-green"></span>
                    </div>
                    <div class="monitor-screen">
                        <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600" alt="Project 4">
                    </div>
                </div>
                <h3 style="margin-bottom: 10px;">E-commerce API Engine</h3>
                <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 20px;">A headless e-commerce backend built for extreme performance and scale.</p>
                <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                    <span style="background: rgba(0, 108, 230, 0.1); color: var(--accent-cyan); padding: 5px 10px; border-radius: 6px; font-size: 0.8rem;">Go</span>
                    <span style="background: rgba(122, 28, 163, 0.1); color: var(--accent-purple); padding: 5px 10px; border-radius: 6px; font-size: 0.8rem;">PostgreSQL</span>
                </div>
                <a href="https://github.com/YWanigaarachchi" target="_blank" class="btn btn-primary" style="padding: 10px 20px; font-size: 1rem;"><i class="fa-brands fa-github"></i> View Repo</a>
            </div>

            <!-- Project 5 -->
            <div class="glass" style="padding: 30px;">
                <div class="monitor-frame">
                    <div class="monitor-top-bar">
                        <span class="dot mac-red"></span>
                        <span class="dot mac-yellow"></span>
                        <span class="dot mac-green"></span>
                    </div>
                    <div class="monitor-screen">
                        <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600" alt="Project 5">
                    </div>
                </div>
                <h3 style="margin-bottom: 10px;">Cloud Deployment Tool</h3>
                <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 20px;">Automated CI/CD pipeline manager with direct AWS integration.</p>
                <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                    <span style="background: rgba(0, 108, 230, 0.1); color: var(--accent-cyan); padding: 5px 10px; border-radius: 6px; font-size: 0.8rem;">Docker</span>
                    <span style="background: rgba(122, 28, 163, 0.1); color: var(--accent-purple); padding: 5px 10px; border-radius: 6px; font-size: 0.8rem;">AWS EC2</span>
                </div>
                <a href="https://github.com/YWanigaarachchi" target="_blank" class="btn btn-primary" style="padding: 10px 20px; font-size: 1rem;"><i class="fa-brands fa-github"></i> View Repo</a>
            </div>

            <!-- Project 6 -->
            <div class="glass" style="padding: 30px;">
                <div class="monitor-frame">
                    <div class="monitor-top-bar">
                        <span class="dot mac-red"></span>
                        <span class="dot mac-yellow"></span>
                        <span class="dot mac-green"></span>
                    </div>
                    <div class="monitor-screen">
                        <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600" alt="Project 6">
                    </div>
                </div>
                <h3 style="margin-bottom: 10px;">AI Chatbot System</h3>
                <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 20px;">Intelligent customer service bot powered by custom NLP models.</p>
                <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                    <span style="background: rgba(0, 108, 230, 0.1); color: var(--accent-cyan); padding: 5px 10px; border-radius: 6px; font-size: 0.8rem;">Python</span>
                    <span style="background: rgba(122, 28, 163, 0.1); color: var(--accent-purple); padding: 5px 10px; border-radius: 6px; font-size: 0.8rem;">TensorFlow</span>
                </div>
                <a href="https://github.com/YWanigaarachchi" target="_blank" class="btn btn-primary" style="padding: 10px 20px; font-size: 1rem;"><i class="fa-brands fa-github"></i> View Repo</a>
            </div>

            <!-- HIDDEN PROJECTS (Show on Click) -->
            <!-- Project 7 -->
            <div class="glass hidden-project" style="padding: 30px; display: none;">
                <div class="monitor-frame">
                    <div class="monitor-top-bar">
                        <span class="dot mac-red"></span>
                        <span class="dot mac-yellow"></span>
                        <span class="dot mac-green"></span>
                    </div>
                    <div class="monitor-screen">
                        <img src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=600" alt="Project 7">
                    </div>
                </div>
                <h3 style="margin-bottom: 10px;">UI Kit Library</h3>
                <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 20px;">A fully accessible, beautifully designed set of React components.</p>
                <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                    <span style="background: rgba(0, 108, 230, 0.1); color: var(--accent-cyan); padding: 5px 10px; border-radius: 6px; font-size: 0.8rem;">React</span>
                    <span style="background: rgba(122, 28, 163, 0.1); color: var(--accent-purple); padding: 5px 10px; border-radius: 6px; font-size: 0.8rem;">Storybook</span>
                </div>
                <a href="https://github.com/YWanigaarachchi" target="_blank" class="btn btn-primary" style="padding: 10px 20px; font-size: 1rem;"><i class="fa-brands fa-github"></i> View Repo</a>
            </div>

            <!-- Project 8 -->
            <div class="glass hidden-project" style="padding: 30px; display: none;">
                <div class="monitor-frame">
                    <div class="monitor-top-bar">
                        <span class="dot mac-red"></span>
                        <span class="dot mac-yellow"></span>
                        <span class="dot mac-green"></span>
                    </div>
                    <div class="monitor-screen">
                        <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600" alt="Project 8">
                    </div>
                </div>
                <h3 style="margin-bottom: 10px;">Security Scanner</h3>
                <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 20px;">Automated vulnerability scanner for web application frameworks.</p>
                <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                    <span style="background: rgba(0, 108, 230, 0.1); color: var(--accent-cyan); padding: 5px 10px; border-radius: 6px; font-size: 0.8rem;">Rust</span>
                    <span style="background: rgba(122, 28, 163, 0.1); color: var(--accent-purple); padding: 5px 10px; border-radius: 6px; font-size: 0.8rem;">Regex</span>
                </div>
                <a href="https://github.com/YWanigaarachchi" target="_blank" class="btn btn-primary" style="padding: 10px 20px; font-size: 1rem;"><i class="fa-brands fa-github"></i> View Repo</a>
            </div>

            <!-- Project 9 -->
            <div class="glass hidden-project" style="padding: 30px; display: none;">
                <div class="monitor-frame">
                    <div class="monitor-top-bar">
                        <span class="dot mac-red"></span>
                        <span class="dot mac-yellow"></span>
                        <span class="dot mac-green"></span>
                    </div>
                    <div class="monitor-screen">
                        <img src="https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=600" alt="Project 9">
                    </div>
                </div>
                <h3 style="margin-bottom: 10px;">Crypto Tracker APP</h3>
                <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 20px;">Mobile app tracking real-time crypto markets with price alerts.</p>
                <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                    <span style="background: rgba(0, 108, 230, 0.1); color: var(--accent-cyan); padding: 5px 10px; border-radius: 6px; font-size: 0.8rem;">Flutter</span>
                    <span style="background: rgba(122, 28, 163, 0.1); color: var(--accent-purple); padding: 5px 10px; border-radius: 6px; font-size: 0.8rem;">Firebase</span>
                </div>
                <a href="https://github.com/YWanigaarachchi" target="_blank" class="btn btn-primary" style="padding: 10px 20px; font-size: 1rem;"><i class="fa-brands fa-github"></i> View Repo</a>
            </div>"""

with open('d:/1_Yasas/10_my website YNW/Y_N_W/project.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the content of grid-3 with our new projects
grid3_start = content.find('<div class="grid-3">') + len('<div class="grid-3">')
grid3_end = content.find('</div>\n    </section>', grid3_start)

new_content = content[:grid3_start] + projects_html + content[grid3_end-8:] # -8 to keep the closing div of grid-3 just to be safe, actually let's just do precise regex or split

