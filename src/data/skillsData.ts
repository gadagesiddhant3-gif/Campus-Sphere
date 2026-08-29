import { SkillCategory } from '../types';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  popular?: boolean;
  trending?: boolean;
  demandLevel: 'Very High' | 'High' | 'Moderate' | 'Explosive';
  iconName?: string;
  description: string;
}

export const ALL_100_SKILLS: SkillItem[] = [
  // 1. Software & Development
  { id: 'web-dev', name: 'Web Development', category: 'Software & Development', popular: true, trending: true, demandLevel: 'Very High', description: 'Full website architecture, HTML5/CSS3, responsive web apps.' },
  { id: 'frontend-dev', name: 'Frontend Development', category: 'Software & Development', popular: true, demandLevel: 'Very High', description: 'React, Vue, Tailwind, interactive state management and visual components.' },
  { id: 'backend-dev', name: 'Backend Development', category: 'Software & Development', popular: true, demandLevel: 'Very High', description: 'Node.js, Python FastAPI, Go, microservices, databases and servers.' },
  { id: 'fullstack-dev', name: 'Full-Stack Development', category: 'Software & Development', popular: true, demandLevel: 'Explosive', description: 'End-to-end full-stack modern web solutions and API integrations.' },
  { id: 'mobile-dev', name: 'Mobile App Development', category: 'Software & Development', popular: true, demandLevel: 'High', description: 'Cross-platform app development using Flutter and React Native.' },
  { id: 'android-dev', name: 'Android Development', category: 'Software & Development', demandLevel: 'High', description: 'Native Kotlin, Jetpack Compose, Android SDK architecture.' },
  { id: 'ios-dev', name: 'iOS Development', category: 'Software & Development', demandLevel: 'High', description: 'Native Swift, SwiftUI, iOS design guidelines and Xcode tools.' },
  { id: 'game-dev', name: 'Game Development', category: 'Software & Development', demandLevel: 'Moderate', description: 'Unity, Unreal Engine 5, C#, physics simulations and gameplay design.' },
  { id: 'software-testing', name: 'Software Testing', category: 'Software & Development', demandLevel: 'Moderate', description: 'Automated testing, Jest, Cypress, QA methodologies and CI/CD tests.' },
  { id: 'devops', name: 'DevOps', category: 'Software & Development', popular: true, demandLevel: 'Very High', description: 'Docker, Kubernetes, GitHub Actions, AWS infrastructure and pipelines.' },
  { id: 'api-dev', name: 'API Development', category: 'Software & Development', demandLevel: 'High', description: 'RESTful API design, GraphQL, Swagger/OpenAPI, authentication.' },
  { id: 'db-mgmt', name: 'Database Management', category: 'Software & Development', demandLevel: 'High', description: 'PostgreSQL, MongoDB, Redis, schema optimization and indexing.' },
  { id: 'ui-ux-dev', name: 'UI/UX Development', category: 'Software & Development', popular: true, demandLevel: 'High', description: 'Translating Figma design systems into pixel-perfect modular web components.' },
  { id: 'wordpress-dev', name: 'WordPress Development', category: 'Software & Development', demandLevel: 'Moderate', description: 'Custom themes, WooCommerce setups, PHP hooks and plugin customization.' },
  { id: 'blockchain-dev', name: 'Blockchain Development', category: 'Software & Development', demandLevel: 'Moderate', description: 'Smart contracts, Solidity, Ethereum, Web3.js and decentralized apps.' },

  // 2. AI, Data & Emerging Technology
  { id: 'ai', name: 'Artificial Intelligence', category: 'AI, Data & Emerging Technology', popular: true, trending: true, demandLevel: 'Explosive', description: 'Foundational AI principles, heuristics, symbolic AI, and neural systems.' },
  { id: 'ml', name: 'Machine Learning', category: 'AI, Data & Emerging Technology', popular: true, trending: true, demandLevel: 'Explosive', description: 'Supervised/unsupervised learning, scikit-learn, XGBoost, and model evaluation.' },
  { id: 'deep-learning', name: 'Deep Learning', category: 'AI, Data & Emerging Technology', popular: true, demandLevel: 'Very High', description: 'PyTorch, TensorFlow, CNNs, RNNs, transformer architectures and backprop.' },
  { id: 'gen-ai', name: 'Generative AI', category: 'AI, Data & Emerging Technology', popular: true, trending: true, demandLevel: 'Explosive', description: 'LLM fine-tuning, RAG pipelines, diffusion models, and multimodal tools.' },
  { id: 'nlp', name: 'Natural Language Processing', category: 'AI, Data & Emerging Technology', demandLevel: 'Very High', description: 'Text classification, tokenization, sentiment analysis, Hugging Face models.' },
  { id: 'computer-vision', name: 'Computer Vision', category: 'AI, Data & Emerging Technology', demandLevel: 'Very High', description: 'OpenCV, YOLO object detection, image segmentation and video processing.' },
  { id: 'data-science', name: 'Data Science', category: 'AI, Data & Emerging Technology', popular: true, demandLevel: 'Very High', description: 'Exploratory data analysis, statistical modeling, hypothesis testing with Python/R.' },
  { id: 'data-analytics', name: 'Data Analytics', category: 'AI, Data & Emerging Technology', popular: true, demandLevel: 'Very High', description: 'SQL analytics, PowerBI, Tableau dashboards, and business KPI tracking.' },
  { id: 'big-data', name: 'Big Data', category: 'AI, Data & Emerging Technology', demandLevel: 'High', description: 'Apache Spark, Hadoop, Kafka streaming, and distributed data lakes.' },
  { id: 'prompt-eng', name: 'Prompt Engineering', category: 'AI, Data & Emerging Technology', trending: true, demandLevel: 'High', description: 'Structured prompt design, few-shot prompting, and context optimization.' },
  { id: 'ai-agents', name: 'AI Agents', category: 'AI, Data & Emerging Technology', trending: true, demandLevel: 'Explosive', description: 'LangChain, AutoGen, multi-agent workflows, autonomous tool-calling systems.' },
  { id: 'reinforcement-learning', name: 'Reinforcement Learning', category: 'AI, Data & Emerging Technology', demandLevel: 'Moderate', description: 'Q-Learning, Policy Gradients, gym environments, and reward functions.' },
  { id: 'robotics', name: 'Robotics', category: 'AI, Data & Emerging Technology', demandLevel: 'High', description: 'ROS2, robot kinematics, path planning, sensor fusion, and actuator control.' },
  { id: 'iot', name: 'Internet of Things', category: 'AI, Data & Emerging Technology', demandLevel: 'High', description: 'ESP32, MQTT protocols, sensor arrays, cloud IoT dashboards and automation.' },
  { id: 'edge-ai', name: 'Edge AI', category: 'AI, Data & Emerging Technology', demandLevel: 'High', description: 'TinyML, ONNX runtime, quantizing neural networks for low-power edge chips.' },

  // 3. Cybersecurity & Networking
  { id: 'cybersecurity', name: 'Cybersecurity', category: 'Cybersecurity & Networking', popular: true, demandLevel: 'Very High', description: 'Threat analysis, security posture, zero-trust architecture and incident triage.' },
  { id: 'ethical-hacking', name: 'Ethical Hacking', category: 'Cybersecurity & Networking', popular: true, demandLevel: 'Very High', description: 'White-hat security testing, vulnerability disclosure, and Kali Linux tools.' },
  { id: 'penetration-testing', name: 'Penetration Testing', category: 'Cybersecurity & Networking', demandLevel: 'High', description: 'Burp Suite, Metasploit, web vulnerability scanning, network pen-testing.' },
  { id: 'digital-forensics', name: 'Digital Forensics', category: 'Cybersecurity & Networking', demandLevel: 'Moderate', description: 'Disk image analysis, memory forensics, artifact discovery and log tracking.' },
  { id: 'network-security', name: 'Network Security', category: 'Cybersecurity & Networking', demandLevel: 'High', description: 'Firewalls, IDS/IPS, VPN architectures, and network traffic anomaly detection.' },
  { id: 'cloud-security', name: 'Cloud Security', category: 'Cybersecurity & Networking', popular: true, demandLevel: 'Very High', description: 'AWS IAM security, GCP security command center, cloud posture management.' },
  { id: 'app-security', name: 'Application Security', category: 'Cybersecurity & Networking', demandLevel: 'High', description: 'OWASP Top 10 mitigation, secure coding practices, SAST/DAST tools.' },
  { id: 'cryptography', name: 'Cryptography', category: 'Cybersecurity & Networking', demandLevel: 'Moderate', description: 'Symmetric/asymmetric encryption, SHA hashing, TLS handshake, key exchange.' },
  { id: 'network-admin', name: 'Network Administration', category: 'Cybersecurity & Networking', demandLevel: 'Moderate', description: 'Cisco routing, VLANs, subnetting, DHCP/DNS setup and router configurations.' },
  { id: 'linux-admin', name: 'Linux Administration', category: 'Cybersecurity & Networking', popular: true, demandLevel: 'High', description: 'Shell scripting (Bash), systemd, user permissions, server maintenance.' },

  // 4. Electronics & Engineering
  { id: 'vlsi-design', name: 'VLSI Design', category: 'Electronics & Engineering', popular: true, trending: true, demandLevel: 'Very High', description: 'RTL synthesis, ASIC physical design, static timing analysis (STA).' },
  { id: 'embedded-systems', name: 'Embedded Systems', category: 'Electronics & Engineering', popular: true, demandLevel: 'Very High', description: 'Microcontroller architecture, bare-metal development, real-time operating systems (RTOS).' },
  { id: 'embedded-c', name: 'Embedded C', category: 'Electronics & Engineering', demandLevel: 'High', description: 'Low-level memory management, register manipulation, peripheral drivers.' },
  { id: 'microcontrollers', name: 'Microcontrollers', category: 'Electronics & Engineering', demandLevel: 'High', description: 'STM32 (ARM Cortex-M), Arduino, PIC, ESP32 and AVR architectures.' },
  { id: 'pcb-design', name: 'PCB Design', category: 'Electronics & Engineering', popular: true, demandLevel: 'High', description: 'KiCad, Altium Designer, multi-layer routing, Gerber generation and EMC design.' },
  { id: 'fpga-dev', name: 'FPGA Development', category: 'Electronics & Engineering', demandLevel: 'High', description: 'Xilinx Vivado, Intel Quartus, look-up tables, clock domain crossing.' },
  { id: 'verilog', name: 'Verilog', category: 'Electronics & Engineering', demandLevel: 'High', description: 'Hardware description language for digital circuits and testbench simulation.' },
  { id: 'systemverilog', name: 'SystemVerilog', category: 'Electronics & Engineering', demandLevel: 'Very High', description: 'UVM verification methodology, functional coverage, constrained random tests.' },
  { id: 'digital-electronics', name: 'Digital Electronics', category: 'Electronics & Engineering', demandLevel: 'Moderate', description: 'Logic gates, Karnaugh maps, sequential logic, flip-flops, and FSM design.' },
  { id: 'analog-electronics', name: 'Analog Electronics', category: 'Electronics & Engineering', demandLevel: 'Moderate', description: 'Op-amps, transistor amplifiers, filters, and analog signal conditioning.' },
  { id: 'power-electronics', name: 'Power Electronics', category: 'Electronics & Engineering', demandLevel: 'High', description: 'Buck/Boost converters, inverters, MOSFET drivers, power conversion systems.' },
  { id: 'circuit-design', name: 'Circuit Design', category: 'Electronics & Engineering', demandLevel: 'High', description: 'SPICE simulations, LTspice, schematic capture, and impedance matching.' },
  { id: 'signal-processing', name: 'Signal Processing', category: 'Electronics & Engineering', demandLevel: 'Moderate', description: 'DSP algorithms, Fourier transforms, digital filters (FIR/IIR), wavelet analysis.' },
  { id: 'control-systems', name: 'Control Systems', category: 'Electronics & Engineering', demandLevel: 'Moderate', description: 'PID controllers, state-space representations, stability criteria (Bode/Nyquist).' },
  { id: 'instrumentation', name: 'Instrumentation', category: 'Electronics & Engineering', demandLevel: 'Moderate', description: 'Transducers, sensors calibration, signal amplifiers, DAQ data acquisition.' },
  { id: 'matlab', name: 'MATLAB', category: 'Electronics & Engineering', popular: true, demandLevel: 'High', description: 'Numerical computation, matrix manipulation, algorithm prototyping.' },
  { id: 'simulink', name: 'Simulink', category: 'Electronics & Engineering', demandLevel: 'High', description: 'Model-based design, system simulation, hardware-in-the-loop (HIL) testing.' },
  { id: 'semiconductor-tech', name: 'Semiconductor Technology', category: 'Electronics & Engineering', trending: true, demandLevel: 'Very High', description: 'Fabrication processes, photolithography, FinFET technology, packaging.' },
  { id: 'ic-design', name: 'IC Design', category: 'Electronics & Engineering', demandLevel: 'High', description: 'Cadence Virtuoso, custom layout, DRC/LVS verification, parasitic extraction.' },
  { id: 'hardware-debugging', name: 'Hardware Debugging', category: 'Electronics & Engineering', demandLevel: 'Moderate', description: 'Logic analyzers, digital oscilloscopes, protocol decoding (I2C, SPI, UART).' },

  // 5. Mechanical, Civil & Core Engineering
  { id: 'cad-design', name: 'CAD Design', category: 'Mechanical, Civil & Core Engineering', popular: true, demandLevel: 'High', description: 'Computer-Aided Drafting, geometric dimensioning and tolerancing (GD&T).' },
  { id: '3d-modeling', name: '3D Modeling', category: 'Mechanical, Civil & Core Engineering', popular: true, demandLevel: 'High', description: 'Parametric part modeling, surface modeling, and assembly design.' },
  { id: 'solidworks', name: 'SolidWorks', category: 'Mechanical, Civil & Core Engineering', popular: true, demandLevel: 'Very High', description: 'Complex mechanical assemblies, sheet metal, weldments, motion studies.' },
  { id: 'autocad', name: 'AutoCAD', category: 'Mechanical, Civil & Core Engineering', demandLevel: 'High', description: '2D engineering blueprints, architectural layouts, and technical drawings.' },
  { id: 'catia', name: 'CATIA', category: 'Mechanical, Civil & Core Engineering', demandLevel: 'High', description: 'Aerospace and automotive surface modeling, advanced generative shape design.' },
  { id: 'ansys', name: 'ANSYS', category: 'Mechanical, Civil & Core Engineering', demandLevel: 'Very High', description: 'Finite Element Analysis (FEA), Computational Fluid Dynamics (CFD), thermal FEA.' },
  { id: '3d-printing', name: '3D Printing', category: 'Mechanical, Civil & Core Engineering', demandLevel: 'Moderate', description: 'Additive manufacturing, FDM/SLA slicers, Cura/PrusaSlicer, rapid prototyping.' },
  { id: 'mechanical-design', name: 'Mechanical Design', category: 'Mechanical, Civil & Core Engineering', demandLevel: 'High', description: 'Machine design, gear train calculations, structural mechanics and material selection.' },
  { id: 'structural-design', name: 'Structural Design', category: 'Mechanical, Civil & Core Engineering', demandLevel: 'High', description: 'RCC design, steel structures, load calculations, STAAD Pro analysis.' },
  { id: 'civil-cad', name: 'Civil CAD', category: 'Mechanical, Civil & Core Engineering', demandLevel: 'Moderate', description: 'Site layout planning, topography mapping, drainage systems, Civil 3D.' },
  { id: 'renewable-energy', name: 'Renewable Energy', category: 'Mechanical, Civil & Core Engineering', trending: true, demandLevel: 'High', description: 'Solar PV array modeling, wind turbine mechanics, green energy systems.' },
  { id: 'ev-tech', name: 'Electric Vehicle Technology', category: 'Mechanical, Civil & Core Engineering', trending: true, demandLevel: 'Very High', description: 'EV powertrain architecture, motor controllers, regenerative braking.' },
  { id: 'battery-tech', name: 'Battery Technology', category: 'Mechanical, Civil & Core Engineering', trending: true, demandLevel: 'Very High', description: 'Lithium-ion chemistry, Battery Management Systems (BMS), thermal runaway prevention.' },
  { id: 'thermal-eng', name: 'Thermal Engineering', category: 'Mechanical, Civil & Core Engineering', demandLevel: 'Moderate', description: 'Heat transfer analysis, thermodynamics cycles, refrigeration, HVAC design.' },
  { id: 'manufacturing-tech', name: 'Manufacturing Technology', category: 'Mechanical, Civil & Core Engineering', demandLevel: 'Moderate', description: 'CNC programming, CAM modeling, casting, injection molding and machining.' },

  // 6. Business & Professional
  { id: 'entrepreneurship', name: 'Entrepreneurship', category: 'Business & Professional', popular: true, demandLevel: 'High', description: 'Startup ideation, lean canvas, venture validation, pitch decks.' },
  { id: 'digital-marketing', name: 'Digital Marketing', category: 'Business & Professional', popular: true, demandLevel: 'High', description: 'SEO optimization, Google Ads, funnel conversion, email campaigns.' },
  { id: 'social-media-mkt', name: 'Social Media Marketing', category: 'Business & Professional', demandLevel: 'High', description: 'Instagram, LinkedIn growth strategies, viral hooks, community engagement.' },
  { id: 'content-marketing', name: 'Content Marketing', category: 'Business & Professional', demandLevel: 'High', description: 'Editorial calendars, long-form articles, audience retention strategies.' },
  { id: 'business-analytics', name: 'Business Analytics', category: 'Business & Professional', popular: true, demandLevel: 'Very High', description: 'Cohort analysis, financial metrics, churn models, and BI reporting.' },
  { id: 'financial-analysis', name: 'Financial Analysis', category: 'Business & Professional', demandLevel: 'High', description: 'DCF valuation, balance sheets, financial modeling in Excel, budgeting.' },
  { id: 'project-mgmt', name: 'Project Management', category: 'Business & Professional', demandLevel: 'High', description: 'Agile/Scrum ceremonies, Jira boards, milestone planning, resource tracking.' },
  { id: 'product-mgmt', name: 'Product Management', category: 'Business & Professional', popular: true, demandLevel: 'Very High', description: 'PRDs, user research, wireframing, feature prioritization, roadmapping.' },
  { id: 'sales', name: 'Sales', category: 'Business & Professional', demandLevel: 'Moderate', description: 'B2B outreach, consultative selling, objection handling, CRM pipelines.' },
  { id: 'business-dev', name: 'Business Development', category: 'Business & Professional', demandLevel: 'High', description: 'Strategic partnerships, affiliate deals, client acquisition channels.' },
  { id: 'public-speaking', name: 'Public Speaking', category: 'Business & Professional', demandLevel: 'Moderate', description: 'Stage presence, storytelling, persuasive delivery, keynote pitching.' },
  { id: 'leadership', name: 'Leadership', category: 'Business & Professional', demandLevel: 'Moderate', description: 'Delegation, conflict resolution, motivating cross-functional teams.' },
  { id: 'communication', name: 'Communication', category: 'Business & Professional', demandLevel: 'High', description: 'Executive correspondence, active listening, clear technical reporting.' },
  { id: 'team-mgmt', name: 'Team Management', category: 'Business & Professional', demandLevel: 'Moderate', description: 'Resource allocation, sprint velocity management, team mentorship.' },
  { id: 'resume-career-dev', name: 'Resume & Career Development', category: 'Business & Professional', popular: true, demandLevel: 'Very High', description: 'ATS resume optimization, portfolio review, mock interviews and career planning.' },

  // 7. Creative & Freelancing
  { id: 'graphic-design', name: 'Graphic Design', category: 'Creative & Freelancing', popular: true, demandLevel: 'High', description: 'Photoshop, Illustrator, vector branding, campus fest merchandise design.' },
  { id: 'ui-ux-design', name: 'UI/UX Design', category: 'Creative & Freelancing', popular: true, trending: true, demandLevel: 'Explosive', description: 'Figma prototypes, design systems, usability testing, mobile-first UX.' },
  { id: 'video-editing', name: 'Video Editing', category: 'Creative & Freelancing', popular: true, trending: true, demandLevel: 'Explosive', description: 'Premiere Pro, DaVinci Resolve, Reels/Shorts pacing, color grading, sound design.' },
  { id: 'photography', name: 'Photography', category: 'Creative & Freelancing', demandLevel: 'Moderate', description: 'Event photography, portrait lighting, Lightroom raw post-processing.' },
  { id: 'videography', name: 'Videography', category: 'Creative & Freelancing', demandLevel: 'Moderate', description: 'Camera angles, gimbal work, multi-cam shooting, campus event coverage.' },
  { id: 'animation', name: 'Animation', category: 'Creative & Freelancing', demandLevel: 'Moderate', description: '2D motion graphics, After Effects, keyframe easing, character animation.' },
  { id: '3d-animation', name: '3D Animation', category: 'Creative & Freelancing', demandLevel: 'Moderate', description: 'Blender 3D, rigging, lighting setup, 3D product render animations.' },
  { id: 'content-creation', name: 'Content Creation', category: 'Creative & Freelancing', popular: true, demandLevel: 'High', description: 'Scriptwriting, visual storytelling, podcast production, micro-content.' },
  { id: 'copywriting', name: 'Copywriting', category: 'Creative & Freelancing', demandLevel: 'High', description: 'Landing page copy, conversion headlines, email newsletters, brand voice.' },
  { id: 'presentation-design', name: 'Presentation Design', category: 'Creative & Freelancing', popular: true, demandLevel: 'High', description: 'Pitch decks, academic presentation slides, visual infographics.' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  'Software & Development',
  'AI, Data & Emerging Technology',
  'Cybersecurity & Networking',
  'Electronics & Engineering',
  'Mechanical, Civil & Core Engineering',
  'Business & Professional',
  'Creative & Freelancing',
];
