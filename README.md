# 🦜 Jogo da Calopsita

Uma paródia divertida do Jogo do Tigrinho, mas com uma calopsita fofa! 🎵

## 🎮 Como Jogar

1. **Escolha sua aposta**: Selecione quantas sementes você quer apostar (10, 25, 50, 100, 250, 500)
2. **Comece o voo**: Clique em "🦜 Começar Voo!" para fazer a calopsita voar
3. **Assobie**: Durante o voo, clique em "🎵 Assobiar!" para interagir com a calopsita
4. **Pare no momento certo**: Clique em "🛑 Parar" antes da calopsita fugir para ganhar!

## 🎯 Objetivo

- A calopsita voa e o multiplicador aumenta
- Quanto mais tempo ela voar, maior o multiplicador
- Mas cuidado! Ela pode fugir a qualquer momento
- Pare no momento certo para multiplicar suas sementes!

## 🛠️ Tecnologias

- **React Native** com Expo
- **TypeScript** para type safety
- **Zustand** para gerenciamento de estado
- **React Native Reanimated** para animações suaves
- **Expo AV** para sons e música de background

## 🚀 Como Executar

1. **Instale as dependências**:
   ```bash
   npm install
   ```

2. **Inicie o projeto**:
   ```bash
   npx expo start
   ```

3. **Teste no seu dispositivo**:
   - Instale o app Expo Go no seu celular
   - Escaneie o QR code que aparece no terminal
   - Ou pressione 'a' para abrir no Android ou 'i' para iOS

## 📱 Funcionalidades

- ✅ **Animação da calopsita** voando com asas batendo
- ✅ **Multiplicador dinâmico** que aumenta com o tempo
- ✅ **Sistema de apostas** com diferentes valores
- ✅ **Frases engraçadas** da calopsita
- ✅ **Fundo animado** com nuvens e sol
- ✅ **Salvamento automático** do progresso
- ✅ **Interface intuitiva** com HUD completo
- ✅ **Sistema de som completo** com música de background e efeitos sonoros
- ✅ **Controle de som** para ativar/desativar
- ✅ **Desconto automático** de sementes ao iniciar o jogo

## 🎵 Sistema de Som

O jogo inclui um sistema completo de som com arquivos locais:

### 🔊 **Música de Background**
- Arquivo: `assets/sounds/background.mp3`
- Toca automaticamente quando o jogo inicia
- Loop contínuo durante o jogo
- Volume controlado (30% do volume máximo)

### 🎵 **Efeitos Sonoros**
- **Assobio**: `assets/sounds/pew.mp3` - Toca quando você clica em "🎵 Assobiar!"
- **Vitória**: `assets/sounds/pew.mp3` - Toca quando você para o jogo e ganha
- **Derrota**: `assets/sounds/gameover.mp3` - Toca quando a calopsita foge

### 🔇 **Controle de Som**
- Botão no canto superior direito para ativar/desativar som
- Ícone muda entre 🔊 (som ativo) e 🔇 (som desativado)
- Labels informativos mostram o estado atual

## 🎨 Características Visuais

- **Calopsita fofa** desenhada com formas geométricas
- **Animações suaves** de voo e bater de asas
- **Fundo animado** com céu, nuvens e flores
- **Cores vibrantes** e tema alegre
- **Interface responsiva** para diferentes tamanhos de tela

## 🔧 Estrutura do Projeto

```
calopsita-jogo/
├── components/          # Componentes reutilizáveis
│   ├── AnimatedBackground.tsx
│   ├── Calopsita.tsx
│   ├── GameHUD.tsx
│   └── SoundToggle.tsx
├── screens/            # Telas do app
│   └── GameScreen.tsx
├── store/              # Gerenciamento de estado
│   └── gameStore.ts
├── hooks/              # Hooks customizados
│   └── useSound.ts
├── assets/             # Recursos
│   └── sounds/         # Arquivos de som
│       ├── background.mp3
│       ├── pew.mp3
│       └── gameover.mp3
├── App.tsx            # Componente principal
└── README.md          # Este arquivo
```

## 🎵 Arquivos de Som

O jogo usa arquivos de som locais de alta qualidade:

- **`background.mp3`** (968KB): Música de background em loop
- **`pew.mp3`** (24KB): Som de assobio e vitória
- **`gameover.mp3`** (108KB): Som de derrota quando a calopsita foge

### 📊 **Configurações de Volume**
- **Background**: 30% - Música suave de fundo
- **Assobio**: 50% - Som claro de interação
- **Vitória**: 70% - Som alegre de sucesso
- **Derrota**: 60% - Som de game over

## 🚀 Próximas Funcionalidades

- [ ] **Loja de acessórios** para a calopsita
- [ ] **Missões diárias** com recompensas
- [ ] **Tabela de recordes** local
- [ ] **Sons personalizados** de assobio
- [ ] **Modo offline** completo
- [ ] **Temas visuais** diferentes
- [ ] **Mais efeitos sonoros** (voo, bater de asas, etc.)

## 🐛 Problemas Conhecidos

- Animações podem ser um pouco pesadas em dispositivos mais antigos

## 📄 Licença

Este projeto é apenas para fins educacionais e de entretenimento. Não é um jogo de apostas real!

---

**Divirta-se com a calopsita! 🦜🎵** 