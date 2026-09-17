export const quizQuestions = [
  {
    id: 1,
    step: 1,
    badge: "Pergunta 1 de 3",
    title: "O que você acha mais legal?",
    subtitle: "Selecione a opção que mais combina com seus interesses naturais.",
    options: [
      {
        id: "1A",
        letter: "A",
        label: "Criar telas, designs e coisas visuais.",
        desc: "Ver cores, botões, animações e a interface tomando forma na sua frente.",
        icon: "Palette",
        category: "Visual & UX"
      },
      {
        id: "1B",
        letter: "B",
        label: "Resolver quebra-cabeças, matemática e lógica oculta.",
        desc: "Desvendar enigmas, estruturar regras e entender como os motores funcionam.",
        icon: "Puzzle",
        category: "Lógica & Estrutura"
      },
      {
        id: "1C",
        letter: "C",
        label: "Organizar informações, planilhas e analisar resultados.",
        desc: "Descobrir padrões, cruzar dados e tirar conclusões inteligentes com números.",
        icon: "BarChart3",
        category: "Dados & Análise"
      }
    ]
  },
  {
    id: 2,
    step: 2,
    badge: "Pergunta 2 de 3",
    title: "Como você prefere trabalhar?",
    subtitle: "Pense no seu estilo favorito de resolver problemas.",
    options: [
      {
        id: "2A",
        letter: "A",
        label: "Vendo o resultado na hora na tela.",
        desc: "Mudou o código ou o layout? O feedback visual imediato é o que te dá energia.",
        icon: "Eye",
        category: "Feedback Visual"
      },
      {
        id: "2B",
        letter: "B",
        label: "Fazendo os sistemas funcionarem nos bastidores.",
        desc: "Garantir que a engrenagem, o banco de dados e a segurança estejam 100% impecáveis.",
        icon: "Server",
        category: "Arquitetura & Infra"
      },
      {
        id: "2C",
        letter: "C",
        label: "Analisando por que as coisas acontecem.",
        desc: "Investigar causas, encontrar tendências em gráficos e otimizar decisões.",
        icon: "Search",
        category: "Investigação & Dados"
      }
    ]
  },
  {
    id: 3,
    step: 3,
    badge: "Pergunta 3 de 3",
    title: "Qual o seu objetivo principal agora?",
    subtitle: "Onde você quer chegar com os seus estudos?",
    options: [
      {
        id: "3A",
        letter: "A",
        label: "Conseguir meu primeiro estágio rápido.",
        desc: "Focar em um conjunto prático e muito demandado no mercado para entrar logo na área.",
        icon: "Zap",
        category: "Entrada Rápida"
      },
      {
        id: "3B",
        letter: "B",
        label: "Me aprofundar e ser um especialista técnico.",
        desc: "Construir bases sólidas, arquitetura de software de alta performance e segurança.",
        icon: "GraduationCap",
        category: "Especialização"
      },
      {
        id: "3C",
        letter: "C",
        label: "Criar meus próprios aplicativos.",
        desc: "Ter autonomia para construir projetos do início ao fim e tirar ideias do papel.",
        icon: "Smartphone",
        category: "Criador de Soluções"
      }
    ]
  }
];

export const careerProfiles = {
  frontend: {
    id: "frontend",
    careerKey: "A",
    title: "Front-end",
    resultHeading: "Seu perfil é: Front-end!",
    badge: "Mestre da Interface & Visual",
    focus: "Foco em UI/UX, React, HTML, CSS",
    tagline: "Você tem paixão por dar vida ao design através de código interativo, telas modernas e feedback visual.",
    accentColor: "from-purple-500 to-indigo-500",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    matchPercentage: "98%",
    starterLevel: "Iniciante Amigável",
    avgSalary: "R$ 4.500 a R$ 14.000+",
    skills: ["UI/UX & Design", "HTML5 Semântico", "CSS3 & Tailwind CSS", "JavaScript (ES6+)", "React.js"],
    firstSteps: [
      "1. Domine HTML semântico e CSS moderno (Flexbox, Grid e Tailwind CSS)",
      "2. Aprenda lógica e manipulação do DOM com JavaScript",
      "3. Construa seu primeiro projeto com React.js",
      "4. Suba seus projetos no GitHub e mostre suas criações no LinkedIn"
    ],
    highlightProject: "Dashboard Gamificado ou Clone de Aplicativo Web",
    iconName: "Palette"
  },
  backend: {
    id: "backend",
    careerKey: "B",
    title: "Back-end / Engenharia de Software",
    resultHeading: "Seu perfil é: Back-end / Engenharia de Software!",
    badge: "Arquiteto dos Bastidores & Lógica",
    focus: "Foco em Python, Java, Lógica",
    tagline: "Você adora resolver quebra-cabeças lógicos e garantir que os sistemas sejam rápidos, seguros e escaláveis.",
    accentColor: "from-emerald-400 to-teal-500",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    matchPercentage: "96%",
    starterLevel: "Foco em Lógica e Estrutura",
    avgSalary: "R$ 5.000 a R$ 16.000+",
    skills: ["Lógica de Programação", "Python ou Java", "Bancos de Dados & SQL", "APIs REST & Node.js", "Estrutura de Dados"],
    firstSteps: [
      "1. Fortaleça sua lógica de programação resolvendo desafios",
      "2. Escolha Python ou Java como sua linguagem principal",
      "3. Aprenda a modelar e consultar bancos de dados com SQL",
      "4. Construa sua primeira API REST e faça o deploy online"
    ],
    highlightProject: "API de Pagamentos ou Sistema de Mensagens em Tempo Real",
    iconName: "Server"
  },
  data: {
    id: "data",
    careerKey: "C",
    title: "Análise de Dados",
    resultHeading: "Seu perfil é: Análise de Dados!",
    badge: "Cientista de Dados & Insights",
    focus: "Foco em SQL, Python, Excel",
    tagline: "Você tem um olhar analítico para descobrir padrões em tabelas, gerar gráficos inteligentes e apoiar decisões com dados.",
    accentColor: "from-cyan-400 to-blue-600",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    matchPercentage: "97%",
    starterLevel: "Analítico & Estratégico",
    avgSalary: "R$ 5.200 a R$ 16.500+",
    skills: ["Excel Avançado", "SQL para Consultas", "Python para Análise (Pandas)", "Dashboards (Power BI)", "Estatística Básica"],
    firstSteps: [
      "1. Domine Excel avançado (PROCV, tabelas dinâmicas e fórmulas)",
      "2. Aprenda SQL para extrair e filtrar grandes volumes de dados",
      "3. Utilize Python e a biblioteca Pandas para automatizar análises",
      "4. Crie dashboards visuais impactantes com Power BI para seu portfólio"
    ],
    highlightProject: "Dashboard de Previsões de Vendas com Power BI e Python",
    iconName: "BarChart3"
  }
};
