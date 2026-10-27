export type CharacterMood = 'idle' | 'email' | 'password' | 'error' | 'success';
export function SanctuaryCharacter({ mood, gaze }: { mood: CharacterMood; gaze: number }) {
  return <div className={`sanctuary-character mood-${mood}`} role="img" aria-label={mood === 'password' ? 'Our shy guardian closes his eyes' : mood === 'success' ? 'Our guardian gives you a thumbs up' : 'Our guardian welcomes you'}>
    <svg viewBox="0 0 400 390" aria-hidden="true">
      <defs>
        <linearGradient id="guardian-skin" x2="0.8" y2="1"><stop stopColor="#a0d5d4"/><stop offset="1" stopColor="#497d8a"/></linearGradient>
        <linearGradient id="guardian-shirt" x2="1" y2="1"><stop stopColor="#263e52"/><stop offset="1" stopColor="#0b1c2c"/></linearGradient>
      </defs>
      <ellipse cx="200" cy="370" rx="105" ry="9" fill="#79d4ff" opacity=".13"/>
      <g className="guardian-body">
        <path d="M166 320L162 360Q174 375 188 361L194 322M208 322L212 361Q229 374 238 359L232 317" fill="url(#guardian-skin)" stroke="#0a2434" strokeWidth="4"/>
        <path d="M145 232Q118 250 127 329Q198 351 273 326Q280 263 250 232Z" fill="url(#guardian-shirt)" stroke="#0a2434" strokeWidth="4"/>
        <path d="M177 227L199 255L223 228M199 255L199 310" fill="none" stroke="#5d8799" strokeWidth="3"/>
        <path d="M142 252Q111 279 121 315Q125 330 137 322L151 284" fill="url(#guardian-skin)" stroke="#0a2434" strokeWidth="4"/>
        <g className="guardian-hand-rest"><path d="M254 254Q288 282 277 318Q270 333 260 321L247 285" fill="url(#guardian-skin)" stroke="#0a2434" strokeWidth="4"/></g>
        <g className="guardian-thumbs-up"><path d="M254 272Q283 280 298 250L313 222Q327 213 335 223L339 244Q346 248 341 261L328 284Q310 307 280 307L260 300" fill="url(#guardian-skin)" stroke="#0a2434" strokeWidth="4"/><path d="M312 240L317 212Q316 194 326 196Q339 201 335 224" fill="url(#guardian-skin)" stroke="#0a2434" strokeWidth="4"/></g>
        <g className="guardian-head">
          <path d="M89 121C62 29 314 7 316 123Q318 178 249 191L245 231Q202 258 153 230L150 190Q97 183 89 121Z" fill="url(#guardian-skin)" stroke="#0a2434" strokeWidth="5"/>
          <g fill="#396f7e" opacity=".6"><ellipse cx="131" cy="72" rx="6" ry="3"/><ellipse cx="165" cy="51" rx="7" ry="3"/><ellipse cx="213" cy="47" rx="6" ry="3"/><ellipse cx="263" cy="63" rx="7" ry="3"/><ellipse cx="287" cy="86" rx="5" ry="3"/></g>
          <path d="M151 87Q194 70 238 86M148 101Q194 84 241 99" fill="none" stroke="#214c5c" strokeWidth="2.5" strokeLinecap="round"/>
          <g className="guardian-eyes-open">
            <ellipse cx="173" cy="143" rx="25" ry="32" fill="#f3e9cf" stroke="#193c4b" strokeWidth="3"/><ellipse cx="223" cy="143" rx="25" ry="32" fill="#f3e9cf" stroke="#193c4b" strokeWidth="3"/>
            <g style={{ transform: `translate(${gaze}px, 2px)` }}><ellipse cx="176" cy="147" rx="7" ry="14" fill="#62382b"/><ellipse cx="220" cy="147" rx="7" ry="14" fill="#62382b"/><circle cx="178" cy="143" r="2.5" fill="white"/><circle cx="222" cy="143" r="2.5" fill="white"/></g>
          </g>
          <g className="guardian-eyes-closed" fill="none" stroke="#183d4d" strokeWidth="4" strokeLinecap="round"><path d="M151 145Q173 160 194 144M202 144Q222 160 245 145"/><path d="M157 151L153 156M239 151L243 156"/></g>
          <g className="guardian-blush" fill="#e59a9d" opacity=".55"><ellipse cx="144" cy="178" rx="16" ry="7"/><ellipse cx="254" cy="178" rx="16" ry="7"/></g>
          <path d="M191 149Q175 181 185 207Q202 225 215 205Q222 187 207 151" fill="url(#guardian-skin)" stroke="#193c4b" strokeWidth="3"/>
          <path className="guardian-mouth" d="M169 220Q199 232 231 218" fill="none" stroke="#183d4d" strokeWidth="3" strokeLinecap="round"/>
        </g>
      </g>
      <g className="guardian-hearts" fill="#b6e4ff"><path d="M304 112C285 94 282 122 304 133C326 120 324 95 304 112Z"/><path d="M83 192C69 178 66 199 83 207C99 198 98 179 83 192Z"/></g>
    </svg>
  </div>;
}
