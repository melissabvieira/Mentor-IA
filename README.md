# Mentor IA - Carreira em Tecnologia

## 📌 Descrição

O Mentor IA é uma aplicação web que utiliza Inteligência Artificial para orientar usuários na construção de suas carreiras na área de tecnologia. A partir de informações simples fornecidas pelo usuário, o sistema analisa seu perfil e gera recomendações personalizadas, ajudando a definir objetivos, identificar pontos de melhoria e traçar um caminho claro de evolução profissional.

A proposta é reduzir a indecisão sobre o que estudar e como crescer na área tech, oferecendo um direcionamento prático e acessível.

---

## 🚀 Funcionalidades

 - Coleta de informações do usuário (interesse, nível, objetivos e disponibilidade)  
 - Análise inteligente do perfil utilizando IA  
 - Identificação de pontos fortes e pontos de melhoria  
 - Sugestão de áreas de atuação dentro da tecnologia  
 - Recomendação de tecnologias e habilidades a serem desenvolvidas  
 - Geração de direcionamento profissional personalizado
  
---

## 🧠 Tecnologias Utilizadas

 - HTML  
 - CSS  
 - TypeScript  
 - React  
 - Vite  
 - Integração com API de Inteligência Artificial (Gemini)  

---

## 💡 Como Funciona

1. O usuário informa:
 - Em qual trilha tecnológica você deseja se destacar?
 - Como você avalia seu conhecimento técnico hoje? Iniciante/Intermediario/ Avançado
 - Qual sua meta profissional para os próximos 6 meses? 
 - Quantas horas semanais você dedicará a este plano? 

2. Os dados são enviados para a IA  

3. A IA retorna:
 - Análise do perfil atual  
 - Principais pontos fortes  
 - Pontos a melhorar
 - Sugestão de carreira
 - Tecnologias que deve aprender  

---

## 📷 Exemplo de Uso

**Entrada:**
 - Em qual trilha tecnológica você deseja se destacar? Ciência de dados
 - Como você avalia seu conhecimento técnico hoje? Intermediario
 - Qual sua meta profissional para os próximos 6 meses? Pleno
 - Quantas horas semanais você dedicará a este plano? 6 horas 

**Saída:**
1. 📊 Análise do perfil atual
Você já superou a barreira da sintaxe básica. Provavelmente já faz limpezas de dados e roda modelos de Machine Learning (Scikit-Learn/Pandas). O desafio agora não é apenas "fazer o modelo funcionar", mas sim: Por que este modelo? Como ele vai para produção? Qual o lucro que ele gera? O nível Pleno exige maturidade técnica e visão de produto.

2. 💪 Principais pontos fortes
Base sólida: Como intermediário, você já tem familiaridade com Python e SQL.
Resiliência: Manter uma rotina de 6 horas semanais exige disciplina, algo valioso em projetos de longo prazo.
Curva de aprendizado: Você já passou pela parte mais difícil (o início). Agora é hora de refinar e aprofundar.

3. 🛠️ Pontos a melhorar (O "Pulo do Gato" para o Pleno)
Estatística Aplicada: Ir além da média/mediana para testes de hipóteses e inferência.
MLOps e Engenharia: Saber colocar um modelo em uma API ou automatizar o treino.
Storytelling e Negócio: Traduzir métricas técnicas (RMSE, F1-Score) em métricas de negócio (R$, churn, conversão).
Código Limpo (Clean Code): Escrever scripts modulares e documentados, não apenas notebooks gigantes.

4. 🚀 Sugestão de carreira: Data Scientist "Full-Cycle"
Para quem quer ser Pleno hoje, o mercado valoriza o cientista que entende um pouco de Engenharia de Dados. Recomendo focar em ser um profissional que resolve o problema de ponta a ponta: extrai (SQL), modela (Python) e entrega (Cloud/API).

5. 🗺️ Roadmap de estudos (6 horas/semana)
Dividiremos seu tempo em ciclos mensais:

Mês 1: SQL Avançado e Modelagem de Dados (O alicerce)
Window Functions, CTEs e otimização de queries.
Como estruturar dados para que o modelo não sofra com data leakage.
Mês 2: Estatística e Validação de Modelos
Testes A/B, p-valor, intervalos de confiança.
Validação cruzada robusta e análise de viés (bias-variance tradeoff).
Mês 3: Engenharia de Software para Data Science
Git/GitHub (versionamento de verdade).
Criação de APIs simples com FastAPI ou Flask para servir modelos.
Mês 4: MLOps e Nuvem
Nocões de Docker.
Uso de uma ferramenta de tracking (ex: MLflow) para gerenciar experimentos.

6. 💻 Tecnologias que deve aprender (Prioridade)
SQL (Nível Expert): Essencial para autonomia.
Scikit-Learn (Avançado): Pipelines e ColumnTransformers.
FastAPI: Para transformar seu modelo em um serviço.
Cloud (AWS, Azure ou GCP): Conhecer pelo menos um serviço de armazenamento (S3) e um de computação (EC2/Lambda).
SHAP/LIME: Bibliotecas para explicabilidade de modelos (essencial para o nível Pleno).

7. 💡 Dicas práticas para entrar no mercado como Pleno
📈 Portfólio de Impacto: Pare de fazer projetos de "Previsão do Titanic". Crie um projeto que resolva um problema real (ex: "Otimização de estoque para um e-commerce fictício usando dados do Kaggle"). Documente o ROI (Retorno sobre Investimento) esperado.
🧠 LinkedIn Estratégico: Mude seu título para "Cientista de Dados". Escreva sobre os desafios técnicos que você resolveu (ex: "Como reduzi o tempo de processamento de uma query em 40%").
🤝 Networking Ativo: Não envie apenas currículos. Participe de comunidades (Data Hackers, por exemplo) e interaja com pessoas que já são Plenos ou Seniores.
🗣️ Storytelling em Entrevistas: Na entrevista para Pleno, foque no "Como". "Eu escolhi o algoritmo X porque ele era mais explicável para os diretores, apesar do algoritmo Y ter 1% a mais de acurácia". Isso mostra maturidade.

Frase de incentivo: O nível Pleno não é alcançado apenas estudando mais, mas sim pensando de forma mais estratégica sobre os problemas que você resolve. 6 horas bem focadas valem mais que 20 horas sem rumo. Vamos pra cima! 🚀🔥
---

## ⚙️ Como Executar

```bash
# Clonar o repositório
git clone https://github.com/melissabvieira/Mentor-IA.git

# Entrar na pasta
cd Mentor-IA

# Rodar em servidor local (ex: XAMPP) ou abrir index.html
