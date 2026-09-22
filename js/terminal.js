import { $, $$, PORTFOLIO, motion, safeURL } from './config.js';

export function initTerminal() {
  /* 07 / TERMINAL: safe DOM output, history, autocomplete, cancellation.
     DOM text nodes preserve arbitrary input as text, never executable HTML. */

  const terminalOutput = $('#terminal-output');
  const terminalInput = $('#terminal-input');
  const terminalAnnouncement = $('#terminal-announcement');

  const commands = [
    'help',
    'about',
    'skills',
    'experience',
    'projects',
    'contact',
    'clear'
  ];

  const history = [];
  let historyIndex = 0;
  let outputGeneration = 0;
  let terminalQueue = Promise.resolve();

  const commandDescriptions = {
    help: 'Display available terminal commands',
    about: 'Learn more about my background and career direction',
    skills: 'Explore my programming languages, technologies, and tools',
    experience: 'View my internships, technical experience, and achievements',
    projects: 'Explore selected full-stack, frontend, and AI projects',
    contact: 'View my contact details, professional profiles, and availability',
    clear: 'Clear all terminal output'
  };

  function textNode(tag, text, className = '') {
    const node = document.createElement(tag);
    node.textContent = text;

    if (className) {
      node.className = className;
    }

    return node;
  }

  function listNode(items) {
    const list = document.createElement('ul');

    items.forEach(item => {
      list.append(textNode('li', item));
    });

    return list;
  }

  function makeLink(label, href, external = false) {
    const link = textNode('a', label);
    link.href = href;

    if (external) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }

    return link;
  }

  function createResponse(command) {
    const nodes = [];

    const p = text => nodes.push(textNode('p', text));
    const heading = text => nodes.push(textNode('h4', text));

    switch (command) {
      case 'help':
        heading('AVAILABLE COMMANDS');

        p(
          'Welcome to my interactive portfolio terminal. Enter a command below to explore my background, technical skills, experience, projects, and contact information.'
        );

        nodes.push(
          listNode(
            commands.map(
              name =>
                `${name.padEnd(11, ' ')} — ${commandDescriptions[name]}`
            )
          )
        );

        heading('TERMINAL CONTROLS');

        nodes.push(
          listNode([
            'Enter — Run the current command.',
            '↑ / ↓ — Navigate through previously entered commands.',
            'clear — Remove all previous terminal output.'
          ])
        );

        p('Tip: Start with "about", "skills", or "projects".');
        break;

      case 'about':
        heading('JANNA ANDREA JUSTINIANO');

        p(
          'Computer Science graduate from FEU Institute of Technology, specializing in Software Engineering and based in Taguig City, Philippines.'
        );

        p(
          'I focus on full-stack development, software engineering, and modern web development—turning ideas into responsive, accessible, and user-centered digital experiences.'
        );

        heading('ACADEMIC DISTINCTIONS');

        nodes.push(
          listNode([
            'Maintained a full-ride scholarship throughout my studies.',
            'Recognized as a Top Performing Student.',
            'Received the Best Thesis Award for XeeAI.',
            'Completed a Bachelor of Science in Computer Science with a specialization in Software Engineering.'
          ])
        );

        heading('CURRENT DIRECTION');

        p(
          'I am building a career centered on full-stack development, software engineering, and web development while continuously strengthening my foundations in frontend engineering, backend systems, databases, testing, and deployment.'
        );

        p(
          'My approach is guided by clarity, empathy, curiosity, and continuous refinement. I believe good software should be technically reliable, visually intentional, accessible, and genuinely useful to the people using it.'
        );
        break;

      case 'skills':
        heading('TECHNICAL STACK');

        p(
          'My toolkit combines frontend engineering, backend development, API integration, artificial intelligence, databases, quality assurance, and IT support fundamentals.'
        );

        heading('FRONTEND DEVELOPMENT');

        nodes.push(
          listNode([
            'HTML5 — Semantic page structure, accessibility, forms, multimedia, and SEO-friendly markup.',
            'CSS3 — Responsive layouts, Flexbox, Grid, animations, transitions, custom properties, and modern visual effects.',
            'JavaScript — DOM manipulation, browser events, asynchronous programming, form handling, and interactive interfaces.',
            'TypeScript — Type-safe application development and maintainable component architecture.',
            'React — Reusable components, state management, hooks, props, and dynamic user interfaces.',
            'Next.js — Full-stack React applications, routing, optimized rendering, and modern web architecture.',
            'Tailwind CSS — Utility-first styling, responsive design systems, and rapid interface development.',
            'Vite — Fast development environments and optimized frontend builds.'
          ])
        );

        heading('BACKEND & API DEVELOPMENT');

        nodes.push(
          listNode([
            'Node.js — JavaScript-based server development and backend application foundations.',
            'FastAPI — Python APIs, request validation, backend routes, and AI service integration.',
            'REST APIs — Client-server communication, HTTP methods, JSON data, endpoints, and third-party integrations.',
            'C# and .NET — Object-oriented programming and enterprise application development foundations.',
            'PHP — Server-side programming and dynamic web development foundations.'
          ])
        );

        heading('PROGRAMMING LANGUAGES');

        nodes.push(
          listNode([
            'JavaScript',
            'TypeScript',
            'Python',
            'C#',
            'PHP',
            'SQL',
            'HTML5',
            'CSS3'
          ])
        );

        heading('DATABASES & DATA');

        nodes.push(
          listNode([
            'Microsoft SQL Server — Relational database and query foundations.',
            'SQL — Data retrieval, filtering, table relationships, and database operations.',
            'Data visualization — Presenting technical and analytical results through understandable visual interfaces.',
            'Structured data handling — Working with JSON, application data, API responses, and datasets.'
          ])
        );

        heading('ARTIFICIAL INTELLIGENCE');

        nodes.push(
          listNode([
            'Google Gemini AI — AI-assisted features and integration in web applications.',
            'scikit-learn — Machine learning workflows and model experimentation.',
            'Explainable AI — Communicating how machine-learning models influence predictions.',
            'C-LIME Interpretability — Local model explanation and input-impact visualization used in XeeAI.',
            'AI tools — ChatGPT, Gemini, Claude, and GitHub Copilot for research, ideation, debugging, documentation, and workflow support.',
            'Prompt engineering — Writing structured prompts, validating results, and improving AI-assisted research.'
          ])
        );

        heading('QUALITY ASSURANCE');

        nodes.push(
          listNode([
            'Functional and non-functional testing fundamentals.',
            'Regression, system, black-box, and white-box testing concepts.',
            'Test-case preparation, defect documentation, and expected-result validation.',
            'Debugging interfaces and checking responsive behavior across screen sizes.'
          ])
        );

        heading('IT OPERATIONS & NETWORKING');

        nodes.push(
          listNode([
            'System health monitoring and performance-metric review.',
            'Hardware, software, and connectivity troubleshooting.',
            'Network infrastructure and user-support fundamentals.',
            'Device setup, onboarding assistance, and technical documentation.',
            'Clear communication of technical instructions to end users.'
          ])
        );

        heading('DEVELOPMENT & DESIGN TOOLS');

        nodes.push(
          listNode([
            'Git and GitHub — Version control, repository management, and project collaboration.',
            'Docker — Containerization and consistent development environments.',
            'VS Code — Primary code editor and development workspace.',
            'Linux — Command-line, development-environment, and system foundations.',
            'Figma — Interface planning, visual references, and design-to-development workflows.',
            'Canva — Graphics, presentation assets, and digital content creation.'
          ])
        );
        break;

      case 'experience':
        heading('COMMVERGE SOLUTIONS');

        p('IT OSS & System Monitoring Intern');

        nodes.push(
          listNode([
            'Supported day-to-day operations involving system monitoring, network visibility, and technical issue tracking.',
            'Reviewed system-health information and performance metrics to help identify unusual behavior or service concerns.',
            'Assisted with connectivity troubleshooting and the documentation of technical findings.',
            'Prepared clear end-user documentation, troubleshooting instructions, and technical reference materials.',
            'Developed practical experience working with operational systems where reliability, accuracy, and timely communication were important.',
            'Strengthened my analytical thinking by reviewing technical information and translating findings into understandable documentation.'
          ])
        );

        heading('KMC SOLUTIONS');

        p('IT Support & Network Solutions Intern');

        nodes.push(
          listNode([
            'Assisted with hardware, software, account, device, and connectivity troubleshooting.',
            'Supported investigations involving network infrastructure and user connectivity issues.',
            'Helped users with onboarding, workstation setup, system access, and general IT support requests.',
            'Documented technical concerns and communicated troubleshooting steps in a clear and user-friendly manner.',
            'Gained hands-on exposure to professional IT support workflows and workplace technology environments.',
            'Improved my ability to diagnose problems methodically while maintaining a patient and service-oriented approach.'
          ])
        );

        heading('FREELANCE WEB DEVELOPMENT');

        p('Website Developer');

        nodes.push(
          listNode([
            'Designed and developed a responsive website based on a business client’s requirements.',
            'Translated business needs into organized page structures, visual sections, and user-friendly navigation.',
            'Applied frontend development principles to create a functional and accessible web experience.',
            'Managed revisions and improved the website based on feedback and practical usability needs.'
          ])
        );

        heading('OPEN-SOURCE & COMMUNITY EXPERIENCE');

        p('WordPress Event Volunteer');

        nodes.push(
          listNode([
            'Contributed time and support to an open-source WordPress community event.',
            'Gained exposure to collaborative technology communities and knowledge-sharing environments.',
            'Strengthened my interest in continuous learning, community participation, and open-source development.'
          ])
        );

        heading('ACADEMIC ACHIEVEMENTS');

        nodes.push(
          listNode([
            'Full-Ride Scholar — Maintained scholarship standing throughout my degree.',
            'Top Performing Student Award — Recognized for strong academic performance.',
            'Best Thesis Award — Received for XeeAI, an explainable artificial-intelligence platform.',
            'Computer Science Graduate — Specialized in Software Engineering at FEU Institute of Technology.'
          ])
        );

        p(
          'Together, these experiences shaped my ability to combine software development, technical troubleshooting, research, documentation, and user-centered problem-solving.'
        );
        break;

      case 'projects':
        heading('SELECTED PROJECTS');

        p(
          'A selection of completed projects spanning frontend development, responsive web applications, e-commerce, and explainable artificial intelligence.'
        );

        // =========================================================
        // 01 / HARVARD RESUME GENERATOR
        // =========================================================

        heading('HARVARD RESUME GENERATOR');

        p(
          'A responsive web application that helps users create a clean, professional Harvard-style resume through structured form inputs and a real-time document preview.'
        );

        nodes.push(
          listNode([
            'Built an interactive resume-building interface with structured sections for personal information, education, experience, skills, and projects.',
            'Implemented a live preview so users can immediately see changes while editing their resume.',
            'Designed reusable React components to keep the application organized and maintainable.',
            'Implemented downloadable document output so users can generate a finished resume.',
            'Focused on responsive design, clear information hierarchy, usability, and consistent document formatting.',
            'Technologies: React, JavaScript, HTML5, CSS3, Vite, Git, and GitHub.'
          ])
        );

        {
          const status = document.createElement('p');

          status.append(
            textNode('strong', 'Status: '),
            textNode('span', 'Completed / Live')
          );

          nodes.push(status);
        }

        {
          const links = document.createElement('p');

          links.append(
            makeLink(
              'View Harvard Resume Generator ↗',
              'https://harvard-resumebuilder.vercel.app',
              true
            )
          );

          nodes.push(links);
        }

        // =========================================================
        // 02 / SHELVES AND STORAGE E-COMMERCE STORE
        // =========================================================

        heading('SHELVES AND STORAGE E-COMMERCE STORE');

        p(
          'A responsive business and e-commerce website created to showcase shelving, storage equipment, and related products through a clear and organized storefront experience.'
        );

        nodes.push(
          listNode([
            'Designed and developed a product-focused website for shelving and storage equipment.',
            'Organized products and business information into clear, accessible website sections.',
            'Created responsive layouts that adapt across desktop, tablet, and mobile screen sizes.',
            'Focused on straightforward navigation, product visibility, readable content, and clear calls to action.',
            'Applied semantic HTML, custom CSS styling, and JavaScript interactions throughout the website.',
            'Deployed the completed website through GitHub Pages.',
            'Technologies: HTML5, CSS3, JavaScript, Git, GitHub, and GitHub Pages.'
          ])
        );

        {
          const status = document.createElement('p');

          status.append(
            textNode('strong', 'Status: '),
            textNode('span', 'Completed / Live')
          );

          nodes.push(status);
        }

        {
          const links = document.createElement('p');

          links.append(
            makeLink(
              'View Shelves and Storage ↗',
              'https://jahatesu.github.io/shelves-and-storage-equipment/',
              true
            )
          );

          nodes.push(links);
        }

        // =========================================================
        // 03 / XEEAI
        // =========================================================

        heading('XEEAI — EXPLAINABLE AI');

        p(
          'An award-winning explainable artificial intelligence platform developed as my thesis project to make machine-learning predictions more transparent and understandable through model explanations and interactive data visualizations.'
        );

        nodes.push(
          listNode([
            'Developed as a full-stack Computer Science thesis project focused on Explainable Artificial Intelligence (XAI).',
            'Integrated C-LIME interpretability to help explain how individual input features influence machine-learning predictions.',
            'Built responsive interfaces for interacting with models, viewing predictions, and exploring explanation results.',
            'Created interactive data visualizations to communicate input impact and model behavior more clearly.',
            'Connected the frontend application with Python and FastAPI services for model analysis and explainability processing.',
            'Integrated Gemini AI into the platform to support AI-assisted functionality.',
            'Contributed to full-stack development and the integration of explainability features throughout the system.',
            'Recognized with the Best Thesis Award.',
            'Technologies: Next.js, React, TypeScript, Python, FastAPI, Tailwind CSS, Gemini AI, scikit-learn, C-LIME, and Docker.'
          ])
        );

        {
          const status = document.createElement('p');

          status.append(
            textNode('strong', 'Recognition: '),
            textNode('span', 'Best Thesis Award')
          );

          nodes.push(status);
        }

        {
          const links = document.createElement('p');

          links.append(
            makeLink(
              'Explore XeeAI ↗',
              'https://xai-research.vercel.app',
              true
            )
          );

          nodes.push(links);
        }

        /*
        Add future completed projects here.

        Example:

        heading('PROJECT NAME');

        p('Project description.');

        nodes.push(
          listNode([
            'Feature or contribution.',
            'Feature or contribution.',
            'Technologies: ...'
          ])
        );

        {
          const links = document.createElement('p');

          links.append(
            makeLink(
              'View Project ↗',
              'PROJECT_URL',
              true
            )
          );

          nodes.push(links);
        }
        */

        p(
          'More projects are currently in development as I continue expanding my portfolio across full-stack engineering, modern web development, artificial intelligence, and software systems.'
        );

        break;

      case 'contact':
        heading('CONTACT');

        p('I am currently open to software engineering, full-stack development, frontend development, and web development opportunities.');

        break;

      default:
        heading('UNKNOWN COMMAND');

        p(`Command not found: "${command}"`);
        p('Type "help" to view the complete list of available commands.');
    }

    return nodes;
  }

  function clearTerminal() {
    outputGeneration += 1;
    terminalOutput.replaceChildren();
    terminalAnnouncement.textContent = 'Terminal cleared.';
  }

  async function outputCommand(command, generation) {
    if (generation !== outputGeneration) return;

    // Prevent the terminal DOM from growing indefinitely.
    if (terminalOutput.children.length >= 40) {
      terminalOutput.firstElementChild.remove();
    }

    const entry = document.createElement('div');
    entry.className = 'terminal-entry';

    entry.append(
      textNode('p', `visitor:~$ ${command}`, 'terminal-command')
    );

    const response = document.createElement('div');
    response.className = 'terminal-response';

    entry.append(response);
    terminalOutput.append(entry);

    const nodes = createResponse(command);

    for (const node of nodes) {
      if (generation !== outputGeneration) return;

      const wasNearBottom =
        terminalOutput.scrollHeight -
          terminalOutput.scrollTop -
          terminalOutput.clientHeight <
        90;

      node.classList.add('terminal-line');
      response.append(node);

      if (wasNearBottom) {
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      }

      if (motion.enabled) {
        await new Promise(resolve => setTimeout(resolve, 45));
      }
    }

    if (generation === outputGeneration) {
      terminalAnnouncement.textContent =
        `${command} complete. ${response.textContent}`;
    }
  }

  function submitCommand(value) {
    const command = value.trim().toLowerCase().slice(0, 120);

    if (!command) return;

    history.push(command);

    if (history.length > 50) {
      history.shift();
    }

    historyIndex = history.length;

    if (command === 'clear') {
      clearTerminal();
      return;
    }

    const generation = outputGeneration;

    terminalQueue = terminalQueue
      .then(() => outputCommand(command, generation))
      .catch(() => {
        terminalAnnouncement.textContent =
          'Unable to render that command. Please try again.';
      });
  }

  $('#terminal-form').addEventListener('submit', event => {
    event.preventDefault();

    submitCommand(terminalInput.value);
    terminalInput.value = '';
  });

  $$('[data-command]').forEach(button => {
    button.addEventListener('click', () => {
      submitCommand(button.dataset.command);
      terminalInput.focus({ preventScroll: true });
    });
  });

  terminalInput.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();

      historyIndex = Math.max(0, historyIndex - 1);
      terminalInput.value = history[historyIndex] || '';
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();

      historyIndex = Math.min(history.length, historyIndex + 1);
      terminalInput.value = history[historyIndex] || '';
    } else if (
      event.key === 'Tab' &&
      !event.shiftKey &&
      terminalInput.value.trim()
    ) {
      const query = terminalInput.value.trim().toLowerCase();

      const matches = commands.filter(command =>
        command.startsWith(query)
      );

      if (matches.length === 1 && query !== matches[0]) {
        event.preventDefault();

        terminalInput.value = matches[0];

        terminalAnnouncement.textContent =
          `Completed command: ${matches[0]}`;
      }
    }
  });
}