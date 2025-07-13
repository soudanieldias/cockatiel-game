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
- **Expo AV** para sons (opcional)

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
│   └── GameHUD.tsx
├── screens/            # Telas do app
│   └── GameScreen.tsx
├── store/              # Gerenciamento de estado
│   └── gameStore.ts
├── hooks/              # Hooks customizados
│   └── useSound.ts
├── assets/             # Recursos (sons, imagens)
├── App.tsx            # Componente principal
└── README.md          # Este arquivo
```

## 🎵 Sons (Opcional)

O jogo inclui suporte para sons, mas por enquanto usa URLs externas. Para adicionar sons próprios:

1. Adicione arquivos de áudio na pasta `assets/sounds/`
2. Atualize o hook `useSound.ts` para usar os arquivos locais
3. Use `require('../assets/sounds/seu-som.mp3')` em vez de URLs

## 🚀 Próximas Funcionalidades

- [ ] **Loja de acessórios** para a calopsita
- [ ] **Missões diárias** com recompensas
- [ ] **Tabela de recordes** local
- [ ] **Sons personalizados** de assobio
- [ ] **Modo offline** completo
- [ ] **Temas visuais** diferentes

## 🐛 Problemas Conhecidos

- Sons externos podem não funcionar em todos os dispositivos
- Animações podem ser um pouco pesadas em dispositivos mais antigos

## 📄 Licença

Este projeto é apenas para fins educacionais e de entretenimento. Não é um jogo de apostas real!

---

**Divirta-se com a calopsita! 🦜🎵** 