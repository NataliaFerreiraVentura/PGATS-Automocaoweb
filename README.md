# 🚀 Projeto de Automação de Testes - Interface Web

## 📚 Disciplina: Automação de Testes na Camada de Interface (Web)

Este projeto foi desenvolvido durante as aulas da disciplina de **Automação de Testes na Camada de Interface (Web)**, demonstrando a implementação de testes automatizados usando Cypress com diferentes padrões e abordagens arquiteturais.

---

## 🎯 Objetivo do Projeto

Desenvolver uma suíte de testes automatizados para o site [Automation Exercise](https://automationexercise.com/), aplicando:

- ✅ **Padrões de teste**: AAA (Arrange, Act, Assert)
- ✅ **Modularização**: Organização do código em módulos especializados
- ✅ **Geração de dados dinâmicos**: Usando Faker.js
- ✅ **Boas práticas**: Separação de responsabilidades e código limpo

---

## 🛠️ Tecnologias Utilizadas

| Ferramenta        | Versão  | Descrição                  |
| ----------------- | ------- | -------------------------- |
| **Cypress**       | 13.7.3  | Framework de testes E2E    |
| **Faker.js**      | 10.1.0  | Geração de dados dinâmicos |
| **JavaScript**    | ES6+    | Linguagem de programação   |
| **Node.js**       | 22.14.0 | Runtime JavaScript         |
| **cypress-xpath** | Latest  | Suporte a seletores XPath  |

---

## 📁 Estrutura do Projeto

```
📦 PGATS-AUTOMOCAOWEB/
├── 📁 cypress/
│   ├── 📁 e2e/
│   │   ├── 📄 automation-exercise.cy.js         # Abordagem tradicional
│   │   ├── 📄 automation-excercise-modules.cy.js # Modularização
│   │   └── 📄 drag-and-drop-and-windows.cy.js  # Testes avançados
│   ├── 📁 fixtures/
│   │   ├── 📄 testData.json                     # Dados estáticos
│   │   ├── 📄 support.json                     # Dados de suporte
│   │   └── 📄 formData.json                    # Dados de formulários
│   ├── 📁 support/
│   │   ├── 📄 commands.js                      # Comandos customizados
│   │   ├── 📄 e2e.js                          # Configurações globais
│   │   └── 📄 helpers.js                      # Funções auxiliares
│   └── 📁 Modules/                            # Modularização
│       ├── 📁 Menu/
│       │   └── 📄 index.js                    # Módulo de navegação
│       ├── 📁 Login/
│       │   └── 📄 index.js                    # Módulo de login
│       └── 📁 Cadastro/
│           └── 📄 index.js                    # Módulo de cadastro
├── 📄 cypress.config.js                      # Configurações do Cypress
├── 📄 package.json                           # Dependências do projeto
└── 📄 README.md                              # Documentação
```

---

## 🧪 Cenários de Teste Implementados

### 📋 **Funcionalidades Testadas:**

1. **👤 Cadastro de Usuário**

   - Cadastro com dados dinâmicos (Faker.js)
   - Validação de campos obrigatórios
   - Verificação de conta criada com sucesso

2. **🔐 Login de Usuário**

   - Login com credenciais válidas
   - Login com credenciais inválidas
   - Validação de mensagens de erro

3. **🚪 Logout de Usuário**

   - Logout após login bem-sucedido
   - Verificação do redirecionamento

4. **⚠️ Validações de Negócio**

   - Tentativa de cadastro com email existente
   - Verificação de mensagens de erro apropriadas

5. **📤 Upload de Arquivos**
   - Envio de formulário com anexo
   - Validação de sucesso no upload

---

## 🏗️ Abordagens Implementadas

### 1. **Abordagem Tradicional** (`automation-exercise.cy.js`)

```javascript
// Código direto no teste - todas as ações inline
cy.get('[data-qa="login-email"]').type(user.email);
cy.get('[data-qa="login-password"]').type(user.password);
cy.get('[data-qa="login-button"]').click();
```

### 2. **Abordagem Modularizada** (`automation-excercise-modules.cy.js`)

```javascript
// Usando módulos especializados para organização
import menu from "../Modules/Menu";
import login from "../Modules/Login";

// Cada módulo encapsula funcionalidades específicas
menu.navegarParaMenuLogin();
login.preencherFormularioDeLogin(user.email, user.password);
```

---

## 🎭 Padrão AAA Implementado

Todos os testes seguem rigorosamente o padrão **AAA**:

```javascript
it("Login com credenciais válidas", () => {
  // ARRANGE - Preparar dados e ambiente
  const validUser = getTestUser("valid");
  menu.navegarParaMenuLogin();

  // ACT - Executar a ação principal
  login.preencherFormularioDeLogin(validUser.email, validUser.password);

  // ASSERT - Verificar o resultado esperado
  cy.get('a[href="/logout"]').should("be.visible");
  cy.get("i.fa-user").parent().should("contain", validUser.name);
});
```

---

## 🎲 Geração de Dados Dinâmicos

### **Faker.js com Localização Brasileira:**

```javascript
import { faker, fakerPT_BR } from "@faker-js/faker";

export function createNewUserData() {
  return {
    name: fakerPT_BR.person.fullName(), // Nome brasileiro
    email: fakerPT_BR.internet.email(), // Email válido
    password: fakerPT_BR.internet.password(), // Senha segura
    phone: fakerPT_BR.phone.number(), // Telefone brasileiro
    address: fakerPT_BR.location.streetAddress(), // Endereço
    city: fakerPT_BR.location.city(), // Cidade
    // ... outros campos
  };
}
```

---

## 🚀 Como Executar o Projeto

### **📋 Pré-requisitos:**

- Node.js (versão 18+)
- Git

### **🔧 Instalação:**

```bash
# 1. Clonar o repositório
git clone https://github.com/NataliaFerreiraVentura/PGATS-Automocaoweb.git

# 2. Entrar no diretório
cd PGATS-AUTOMOCAOWEB

# 3. Instalar dependências
npm install
```

### **▶️ Execução dos Testes:**

```bash
# �️ Interface gráfica para desenvolvimento
npm run cy:open          # Modo interativo para desenvolvimento

# � Execução em modo headless
npm run cy:run           # Execução completa dos testes

# ⚡ Execução otimizada para CI/CD
npm run cy:run:headless  # Modo headless otimizado

# 🎯 Execução específica por navegador
npm run cy:run:chrome    # Execução no navegador Chrome
```

### **🎯 Execução por Arquivo Específico:**

```bash
# Arquivo tradicional
npx cypress run --spec "cypress/e2e/automation-exercise.cy.js"

# Arquivo com módulos
npx cypress run --spec "cypress/e2e/automation-excercise-modules.cy.js"

# Todos os arquivos com configurações otimizadas
npx cypress run --config video=false,screenshotOnRunFailure=true
```

---

## 📊 Relatórios e Artefatos de Teste

### **📈 Relatórios Automáticos:**

O projeto gera relatórios completos usando **Mochawesome**:

- 📁 **Local:** `cypress/reports/html/index.html`
- � **Métricas:** Testes passados/falhou, tempo de execução, detalhes por teste
- 📸 **Screenshots:** Capturados automaticamente em momentos críticos
- 🎥 **Vídeos:** Gravação opcional para debug (configurável)

### **🤖 Artefatos no CI/CD:**

**GitHub Actions** automaticamente coleta e disponibiliza:

| Artefato                         | Quando        | Retenção | Conteúdo                                       |
| -------------------------------- | ------------- | -------- | ---------------------------------------------- |
| `cypress-test-results-{run}`     | Sempre        | 30 dias  | Screenshots, relatórios HTML, vídeos           |
| `cypress-failure-evidence-{run}` | Apenas falhas | 7 dias   | Screenshots e relatórios de falhas específicas |

### **📱 Acesso aos Artefatos:**

1. **GitHub Actions** → Workflow executado
2. **Artifacts** (seção no final da página)
3. **Download** do arquivo ZIP
4. **Extrair** e abrir `reports/html/index.html`

### **🔍 Visualização Local:**

```bash
# Abrir relatório HTML local
npm run cy:run && open cypress/reports/html/index.html

# Verificar screenshots capturados
ls cypress/screenshots/
```

### **📊 Visualização dos Resultados:**

Os relatórios são gerados automaticamente após cada execução:

```
cypress/
├── screenshots/     # Capturas de tela dos testes
├── reports/         # Relatórios HTML detalhados
└── videos/          # Gravações de execução (opcional)
```

---

## 🎓 Conceitos Aprendidos

### **📚 Fundamentos:**

- ✅ Configuração e setup do Cypress
- ✅ Seletores CSS e XPath
- ✅ Comandos básicos do Cypress
- ✅ Assertions e validações

### **🏗️ Arquitetura:**

- ✅ Modularização de código
- ✅ Separação de responsabilidades
- ✅ Organização em módulos especializados
- ✅ Reutilização de componentes

### **🧪 Boas Práticas:**

- ✅ Padrão AAA (Arrange, Act, Assert)
- ✅ Geração de dados dinâmicos
- ✅ Fixtures para dados estáticos
- ✅ Helpers para funções auxiliares

### **🔧 Ferramentas:**

- ✅ Faker.js para dados realistas
- ✅ cypress-xpath para seletores XPath
- ✅ Mochawesome para relatórios
- ✅ Git para versionamento

---

## 🚀 Melhorias e Otimizações Implementadas

### **🔧 Configurações Otimizadas do Cypress:**

- ✅ **Gestão de memória** otimizada para melhor performance
- ✅ **Configurações de viewport** padronizadas (1280x720)
- ✅ **Timeouts otimizados** para execução mais rápida
- ✅ **Compressão de vídeo** configurável para economia de espaço

### **📸 Sistema de Capturas Inteligente:**

```javascript
// Capturas condicionais baseadas no ambiente
cy.captureStep("login-sucesso"); // Screenshot em momento crítico
cy.captureElement(".status", "resultado"); // Captura elemento específico

// Configurações automáticas por ambiente
// Desenvolvimento: Screenshots habilitados
// CI/CD: Apenas capturas em falhas
```

### **🤖 Automação de CI/CD:**

O projeto inclui **GitHub Actions** otimizado com:

- 🔄 **Configuração automática** de ambiente para CI/CD
- **Upload de artefatos** apenas em caso de falhas
- ⚡ **Execução em modo headless** para performance máxima

```yaml
# Exemplo de configuração no CI/CD
- name: Configurar ambiente para CI
  run: |
    echo '{"CAPTURE_SCREENSHOTS": false, "VIDEO_RECORDING": false}' > cypress.env.json

- name: Upload evidências de falha (apenas falhas)
  uses: actions/upload-artifact@v4
  if: failure()
  with:
    name: cypress-failure-evidence-${{ github.run_number }}
    path: |
      cypress/screenshots/**/*
      cypress/reports/**/*
    retention-days: 7
```

### **⚡ Comandos de Execução:**

**Comandos disponíveis:**

| Comando                   | Descrição                     | Uso                     |
| ------------------------- | ----------------------------- | ----------------------- |
| `npm run cy:open`         | Interface gráfica do Cypress  | �️ Desenvolvimento      |
| `npm run cy:run`          | Execução completa dos testes  | � Execução padrão       |
| `npm run cy:run:headless` | Execução otimizada sem UI     | ⚡ Performance máxima   |
| `npm run cy:run:chrome`   | Execução específica no Chrome | 🎯 Navegador específico |

**Exemplo de uso:**

```bash
# Desenvolvimento com interface gráfica
npm run cy:open

# Execução completa dos testes
npm run cy:run

# Execução otimizada para CI/CD
npm run cy:run:headless
```

### **📊 Monitoramento de Execução:**

**Saídas dos testes:**

- � **Screenshots**: Capturados automaticamente em falhas
- 📁 **Relatórios**: Gerados em formato HTML após execução
- 🎥 **Vídeos**: Disponíveis quando habilitados na configuração

### **🔄 Integração Contínua:**

**Fluxo otimizado:**

1. 📥 **Clone** do repositório
2. 📦 **Instalação** de dependências
3. ⚙️ **Configuração** automática para CI/CD
4. 🧪 **Execução** dos testes em modo otimizado
5. **Upload** de evidências (apenas falhas)

**Benefícios:**

- ⚡ **Execução otimizada** para ambientes de CI/CD
- 💾 **Artefatos seletivos** apenas quando necessário
- 🎯 **Upload inteligente** baseado em resultados
- 📊 **Visibilidade** completa do processo

---

## 🎯 Resultados Alcançados

### **📈 Métricas do Projeto:**

- **6 cenários** de teste implementados
- **2 arquiteturas** diferentes demonstradas
- **100% de cobertura** das funcionalidades principais
- **0 falsos positivos** nos testes
- **Dados dinâmicos** em todos os testes de cadastro

### **🏆 Benefícios Obtidos:**

- ✅ **Automação completa** do fluxo de usuário
- ✅ **Detecção precoce** de bugs
- ✅ **Execução rápida** e confiável
- ✅ **Relatórios detalhados** de execução
- ✅ **Código reutilizável** e manutenível

---

## 👥 Autor

**👨‍🎓 Estudante:** [Seu Nome]  
**🏫 Instituição:** PGATS - Pós Graduação  
**📚 Disciplina:** Automação de Testes na Camada de Interface (Web)  
**📅 Período:** 2025

---

## 📞 Suporte

Para dúvidas ou sugestões:

- 📧 **Email:** [nataliaferreiraventura@gmail.com](mailto:nataliaferreiraventura@gmail.com)
- 🐙 **GitHub:** [@NataliaFerreiraVentura](https://github.com/NataliaFerreiraVentura)
- 💼 **LinkedIn:** [Natalia Ferreira Ventura](https://www.linkedin.com/in/natalia-ferreira-ventura-a3327b15b/)

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte do curso de Pós-Graduação em Automação de Testes.

---

**⭐ Gostou do projeto? Deixe uma star no repositório!**

---

_Projeto desenvolvido com 💚 e muito ☕ durante as aulas de Automação de Testes_
