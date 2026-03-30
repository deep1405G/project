import { T } from "../../theme/tokens";

import BreathingGame from "./BreathingGame";
import ColorGame from "./ColorGame";
import MemoryGame from "./MemoryGame";
import SnakeGame from "./SnakeGame";
import TileGame from "./TileGame";
import WordleGame from "./WordleGame";

export const GAMES = [
  { id: "memory", icon: "🧠", name: "Memory Match", desc: "Flip & match emoji pairs", col: T.accent, Comp: MemoryGame },
  { id: "breathe", icon: "🌬️", name: "Breathing Bubble", desc: "4-7-8 calming technique", col: T.green, Comp: BreathingGame },
  { id: "wordle", icon: "💬", name: "MindWord", desc: "Guess the 5-letter word", col: T.yellow, Comp: WordleGame },
  { id: "color", icon: "🎨", name: "Color Clash", desc: "Name the ink color — fast!", col: T.pink, Comp: ColorGame },
  { id: "snake", icon: "🐍", name: "Chill Snake", desc: "Classic snake, no pressure", col: T.teal, Comp: SnakeGame },
  { id: "tiles", icon: "🔢", name: "MindTiles", desc: "Merge tiles to reach 2048", col: T.orange, Comp: TileGame },
];

export default GAMES;
