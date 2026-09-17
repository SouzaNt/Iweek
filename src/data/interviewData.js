import { allCareersCatalog } from './careersCatalog';

/**
 * 1. O Cérebro do Chatbot (System Prompt Oficial da IA NorTech)
 */
export const NORTECH_SYSTEM_PROMPT = `Você é o NorTech, um mentor de carreiras de tecnologia amigável e descontraído. Seu objetivo é conversar com jovens estudantes e descobrir qual área da TI (ex: Engenharia de Software, UX Design, Análise de Dados) mais combina com eles.

Regras da conversa:
1. Faça APENAS UMA pergunta por vez. Nunca envie blocos gigantes de texto.
2. Seja reativo: leia o que o usuário respondeu, faça um breve comentário validando a resposta e, em seguida, faça a próxima pergunta cavando mais fundo nos interesses dele (hobbies, matérias favoritas, como resolve problemas).
3. Adapte seu tom para alguém que está no ensino médio ou curso técnico.
4. Quando você tiver feito cerca de 3 a 5 trocas de mensagens e estiver confiante do perfil do usuário, ENCERRE a conversa retornando EXCLUSIVAMENTE um objeto JSON com as 3 melhores profissões no formato: {"top_matches": ["id-1", "id-2", "id-3"]}. Não escreva mais nada além do JSON no final.`;

export const interviewQuestions = [
  {
    id: 1,
    number: 1,
    aiGreeting: "E aí! Sou o NorTech, seu mentor de tecnologia. 🚀 Vamos bater um papo rápido para descobrir qual área da TI tem mais a ver com você!",
    question: "Para começar: me conta sobre um projeto, trabalho escolar ou hobby que você curtiu muito fazer. O que exatamente você fez nele que te deu mais orgulho?",
    placeholder: "Ex: Eu fiz uma apresentação onde criei todos os slides e ilustrações... / Montei uma planilha com fórmulas para organizar gastos...",
    quickTags: [
      "Foquei no visual, cores e no design da apresentação 🎨",
      "Criei as regras, cálculos e a lógica de como funcionava 🧩",
      "Organizei tabelas de dados, gráficos e pesquisas 📊",
      "Fiz a programação e o código funcionarem na prática 💻"
    ]
  },
  {
    id: 2,
    number: 2,
    aiGreeting: "Massa demais!",
    question: "Se um app ou jogo que você usa todo dia começasse a travar ou ficasse confuso de usar, qual seria a sua vontade imediata?",
    placeholder: "Ex: Eu iria querer redesenhar a tela para ficar intuitivo... / Gostaria de abrir o código e consertar o bug do servidor...",
    quickTags: [
      "Redesenhar a interface para ficar muito mais bonita e intuitiva 📱",
      "Descobrir o erro no código ou no servidor que causou a lentidão ⚙️",
      "Analisar se os dados dos usuários estão seguros contra vazamentos 🛡️",
      "Criar testes automáticos para garantir que nunca mais trave 🔍"
    ]
  },
  {
    id: 3,
    number: 3,
    aiGreeting: "Excelente reflexão!",
    question: "Quando surge um problema difícil que você nunca viu na vida (tipo uma matéria nova ou um desafio prático), qual é a sua primeira atitude natural?",
    placeholder: "Ex: Eu começo desenhando o fluxo em um papel... / Eu divido o problema em pequenas partes lógicas...",
    quickTags: [
      "Desenho rascunhos visuais e tento imaginar o resultado final 💡",
      "Quebro o problema em partes lógicas e testo hipóteses uma a uma 🧩",
      "Coleto dados, pesquiso estatísticas e procuro padrões comprovados 📈",
      "Organizo as ideias com clareza e divido as etapas com o time 👥"
    ]
  },
  {
    id: 4,
    number: 4,
    aiGreeting: "Muito bom, estou pegando seu estilo!",
    question: "Se você estivesse fundando uma startup de tecnologia com seus amigos hoje, qual papel você escolheria?",
    placeholder: "Ex: Cuidando da experiência e do design do produto... / Criando a arquitetura dos servidores e das IAs...",
    quickTags: [
      "Criando o design, a identidade visual e as telas do app 🚀",
      "Programando as APIs, a infraestrutura e os bancos de dados 🧠",
      "Construindo os modelos de Inteligência Artificial e Data Science 🤖",
      "Liderando o produto, definindo estratégias e conversando com clientes 🎯"
    ]
  },
  {
    id: 5,
    number: 5,
    aiGreeting: "Show de bola! Última pergunta para fecharmos o diagnóstico:",
    question: "Qual é o seu maior 'superpoder' ou habilidade que seus colegas e professores mais costumam elogiar em você?",
    placeholder: "Ex: As pessoas dizem que tenho muita facilidade com lógica e números... / Elogiam minha criatividade e atenção aos detalhes...",
    quickTags: [
      "Criatividade visual, estética e facilidade para aprender ferramentas novas ✨",
      "Raciocínio lógico rápido e persistência para resolver bugs difíceis ⚡",
      "Curiosidade investigativa, gosto por números e análise crítica 🔍",
      "Liderança natural, empatia e facilidade de comunicação 🗣️"
    ]
  }
];

/**
 * Generates dynamic reactive commentary based on the student's answer (Rule 2 of System Prompt).
 */
export function getReactiveFeedback(userAnswer, nextQuestionIndex) {
  const ans = (userAnswer || "").toLowerCase();

  if (nextQuestionIndex === 1) { // Transitioning to Q2
    if (ans.includes("visual") || ans.includes("design") || ans.includes("cor") || ans.includes("apresenta") || ans.includes("slide") || ans.includes("desenh") || ans.includes("ilustra")) {
      return "Demais! Ter esse olhar cuidadoso para a estética e experiência visual é um talento gigantesco na tecnologia. 🎨";
    }
    if (ans.includes("lógica") || ans.includes("código") || ans.includes("program") || ans.includes("calcul") || ans.includes("regra")) {
      return "Que massa! Quem gosta de quebrar a cabeça com regras e lógica se sente super em casa desenvolvendo software. 💻";
    }
    if (ans.includes("dado") || ans.includes("planilha") || ans.includes("tabela") || ans.includes("gráfico") || ans.includes("pesquisa")) {
      return "Sensacional! Organizar dados e transformar números em respostas práticas é uma das habilidades mais valorizadas hoje. 📊";
    }
    return "Muito legal essa experiência! Isso mostra bastante sobre seu jeito de aprender e colocar a mão na massa. 🚀";
  }

  if (nextQuestionIndex === 2) { // Transitioning to Q3
    if (ans.includes("interface") || ans.includes("redesenh") || ans.includes("bonit") || ans.includes("tela") || ans.includes("intuitiv")) {
      return "Totalmente! Quando a interface é bonita e intuitiva, o usuário ama usar o app sem esforço. 📱";
    }
    if (ans.includes("código") || ans.includes("servidor") || ans.includes("bug") || ans.includes("lentid")) {
      return "Perfeito! Ir direto na raiz do problema e otimizar a máquina por dentro é puro instinto de engenheiro de software. ⚙️";
    }
    if (ans.includes("seguranç") || ans.includes("vazamento") || ans.includes("proteg")) {
      return "Fundamental! Proteger sistemas e dados sigilosos contra invasões é um papel heróico na TI. 🛡️";
    }
    return "Excelente raciocínio! Ter iniciativa para consertar e melhorar o que usamos todo dia é essencial. 💡";
  }

  if (nextQuestionIndex === 3) { // Transitioning to Q4
    if (ans.includes("desenho") || ans.includes("rascunho") || ans.includes("visual") || ans.includes("imagin")) {
      return "Sensacional! Pensar visualmente ajuda a clarear até os desafios mais complexos. 🎨";
    }
    if (ans.includes("quebro") || ans.includes("partes") || ans.includes("hipótese") || ans.includes("lógic")) {
      return "Brilhante! O pensamento computacional consiste exatamente em fatiar grandes problemas em pequenos passos lógicos. 🧩";
    }
    if (ans.includes("dado") || ans.includes("pesquis") || ans.includes("estatístic") || ans.includes("padrõ")) {
      return "Muito inteligente! Decisões guiadas por dados e fatos eliminam o achismo e garantem precisão. 📈";
    }
    return "Ótima abordagem! Cada mente tem uma estratégia única e poderosa para desatar nós. ✨";
  }

  if (nextQuestionIndex === 4) { // Transitioning to Q5
    if (ans.includes("design") || ans.includes("tela") || ans.includes("identidade") || ans.includes("app")) {
      return "Incrível! Dar alma, identidade e elegância ao produto é o que conquista milhões de usuários. 🚀";
    }
    if (ans.includes("api") || ans.includes("servidor") || ans.includes("infraestrutura") || ans.includes("banco")) {
      return "Show de bola! Construir a espinha dorsal e a robustez que suporta o sistema de pé é empolgante. 🧠";
    }
    if (ans.includes("ia") || ans.includes("inteligência") || ans.includes("science") || ans.includes("modelos")) {
      return "Espetacular! Trabalhar na fronteira da Inteligência Artificial é moldar o futuro da humanidade. 🤖";
    }
    return "Excelente visão! Saber onde sua energia brilha mais é meio caminho andado para o sucesso. 🎯";
  }

  return "Perfeito! Estou processando todas as suas respostas com muita atenção.";
}

/**
 * Generates the full prompt payload formatted with transcript & careers JSON
 */
export function generateInterviewPrompt(responses) {
  const transcriptText = responses.map((r, i) => `Pergunta ${i + 1}: ${r.question}\nResposta do Estudante: ${r.answer}`).join("\n\n");
  const careersJson = JSON.stringify(allCareersCatalog.map(c => ({
    id: c.id,
    titulo: c.titulo,
    categoria: c.categoria,
    descricao: c.descricao
  })), null, 2);

  return `${NORTECH_SYSTEM_PROMPT}\n\n--- TRANSCRIÇÃO DA ENTREVISTA ---\n${transcriptText}\n\n--- CARREIRAS DE TI DISPONÍVEIS (JSON) ---\n${careersJson}`;
}

/**
 * Semantic Evaluation Engine conforming to the NorTech AI Prompt.
 * Evaluates the 33 careers from allCareersCatalog and returns top_matches JSON format:
 * { "top_matches": ["id-1", "id-2", "id-3"] }
 */
export function analyzeInterviewResponses(responses) {
  const allText = responses.map(r => (r.answer || "").toLowerCase()).join(" ");
  
  // Categorical Profile weights
  let scoreCreative = 0;
  let scoreDev = 0;
  let scoreData = 0;
  let scoreInfra = 0;
  let scoreManagement = 0;

  // Keyword lexicons
  const keywordsCreative = ["visual", "design", "tela", "cores", "interface", "bonit", "apresenta", "protótipo", "figma", "css", "html", "estétic", "criativid", "desenh", "ilustra", "ux", "ui"];
  const keywordsDev = ["código", "lógica", "program", "servidor", "bug", "resolver", "partes", "api", "sistema", "funcionar", "calcul", "engenharia", "react", "python", "node", "app", "mobile"];
  const keywordsData = ["dado", "tabela", "gráfico", "planilha", "análise", "número", "padrões", "estatístic", "ia", "inteligência", "pesquisa", "insights", "power bi", "sql", "excel"];
  const keywordsInfra = ["seguranç", "vazamento", "proteger", "redes", "travamento", "testes", "falha", "hacker", "infraestrutura", "nuvem", "cloud", "servidor", "linux"];
  const keywordsManagement = ["time", "lideran", "organiza", "pessoas", "estratégi", "clientes", "comunica", "produto", "equipe", "ouvir", "agilidade", "scrum", "qualidade"];

  keywordsCreative.forEach(w => { if (allText.includes(w)) scoreCreative += 2.5; });
  keywordsDev.forEach(w => { if (allText.includes(w)) scoreDev += 2.5; });
  keywordsData.forEach(w => { if (allText.includes(w)) scoreData += 2.5; });
  keywordsInfra.forEach(w => { if (allText.includes(w)) scoreInfra += 2.5; });
  keywordsManagement.forEach(w => { if (allText.includes(w)) scoreManagement += 2.5; });

  // Score each of the 33 careers in allCareersCatalog
  const scoredCatalog = allCareersCatalog.map((career) => {
    let careerScore = 0;

    // Base score by category
    if (career.categoria === "Criativo e Visual") careerScore += scoreCreative;
    if (career.categoria === "Desenvolvimento") careerScore += scoreDev;
    if (career.categoria === "Dados e IA") careerScore += scoreData;
    if (career.categoria === "Infraestrutura e Segurança") careerScore += scoreInfra;
    if (career.categoria === "Gestão e Qualidade") careerScore += scoreManagement;

    // Direct skill/title keyword matching
    career.skills.forEach(skill => {
      if (allText.includes(skill.toLowerCase())) careerScore += 4;
    });

    if (allText.includes(career.titulo.toLowerCase())) careerScore += 5;

    // Specific job heuristics
    if (career.id === 'dev-frontend' && scoreCreative > 2 && scoreDev > 2) careerScore += 4;
    if (career.id === 'ui-designer' && scoreCreative > 3) careerScore += 3;
    if (career.id === 'ux-designer' && (scoreCreative > 2 || scoreManagement > 2)) careerScore += 3;
    if (career.id === 'dev-backend' && scoreDev > 3) careerScore += 3;
    if (career.id === 'analista-dados' && scoreData > 2) careerScore += 3;
    if (career.id === 'analista-seguranca' && scoreInfra > 2) careerScore += 3;
    if (career.id === 'product-manager' && scoreManagement > 2) careerScore += 3;

    return {
      ...career,
      computedScore: careerScore
    };
  });

  // Sort descending by score
  scoredCatalog.sort((a, b) => b.computedScore - a.computedScore);

  // Take top 3
  const top3Candidates = scoredCatalog.slice(0, 3);

  // Exact JSON output format requested in the prompt
  const top_matches_json = {
    top_matches: top3Candidates.map(c => c.id)
  };

  console.log("NorTech AI Prompt Result JSON:", JSON.stringify(top_matches_json, null, 2));

  // Build enhanced top careers objects for the AkinatorTechResult component
  const topCareers = top3Candidates.map((career, idx) => ({
    ...career,
    matchPercentage: `${Math.max(90, 99 - idx * 3)}% Match`,
    badge: idx === 0 
      ? "🔮 Top 1 • Sua Maior Vocação Tech" 
      : idx === 1 
        ? "⚡ Top 2 • Segunda Alternativa Ideal" 
        : "🎯 Top 3 • Outra Rota Promissora",
    timelineKey: career.categoria === "Criativo e Visual" || career.id.includes("front") 
      ? "frontend" 
      : career.categoria === "Dados e IA" 
        ? "data" 
        : "backend"
  }));

  const bestMatch = topCareers[0];

  return {
    rawJsonOutput: top_matches_json,
    topCareers: topCareers,
    recommendedCareer: bestMatch.titulo,
    area: bestMatch.categoria,
    icon: bestMatch.icon,
    salary: bestMatch.salario,
    affinityRate: "98.4%",
    summaryReport: `Com base na conversa, o NorTech identificou forte afinidade cognitiva com ${bestMatch.titulo}. Seus traços evidenciam facilidade natural para ${bestMatch.categoria.toLowerCase()} e grande potencial de impacto no mercado digital.`,
    topTraits: [
      `Forte afinidade com a área de ${bestMatch.categoria}`,
      "Raciocínio estruturado para resolução de desafios",
      "Facilidade de aprendizado e adaptação a novas ferramentas",
      "Orientação a resultados práticos e funcionais"
    ]
  };
}
