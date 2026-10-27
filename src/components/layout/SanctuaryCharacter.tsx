export type CharacterMood = 'idle' | 'email' | 'password' | 'error' | 'success';

export function SanctuaryCharacter({ mood, gaze }: { mood: CharacterMood; gaze: number }) {
  const description = mood === 'password'
    ? 'Squidward covers both eyes with his hands'
    : mood === 'success' ? 'Squidward gives you a thumbs up' : 'Squidward stands facing you';

  return (
    <div className={`sanctuary-character mood-${mood}`} role="img" aria-label={description}>
      <svg viewBox="0 0 400 460" aria-hidden="true">
        <defs>
          <linearGradient id="guardian-skin" x1="0" y1="0" x2="1" y2=".7">
            <stop stopColor="#a5d5c9"/><stop offset=".55" stopColor="#86bcb3"/><stop offset="1" stopColor="#639e9d"/>
          </linearGradient>
          <linearGradient id="guardian-polo" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#b38b50"/><stop offset="1" stopColor="#795a34"/>
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="443" rx="101" ry="8" fill="#9ddfff" opacity=".12"/>
        <g className="guardian-body" stroke="#183c3d" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
          {/* Four tentacle feet and the familiar short-sleeved polo. */}
          <g fill="url(#guardian-skin)">
            <path d="M163 337Q152 374 146 414Q128 417 121 430Q119 442 147 439Q166 438 168 419L185 345Z"/>
            <path d="M184 342L176 414Q166 425 170 435Q175 445 191 436Q202 429 199 413L203 343Z"/>
            <path d="M205 342L207 414Q201 432 215 438Q236 446 233 432L228 413L226 342Z"/>
            <path d="M224 341L240 419Q241 438 259 439Q284 443 279 430Q273 419 256 414L242 337Z"/>
          </g>
          <path d="M154 262Q132 264 119 290L139 308L146 297L144 346Q198 363 257 345L254 297L263 309L284 290Q274 270 249 262L228 254L175 254Z" fill="url(#guardian-polo)"/>
          <path d="M177 234L174 263L199 281L226 263L224 234" fill="url(#guardian-skin)"/>
          <path d="M174 261L164 270L184 293L199 281L215 293L237 270L226 261M199 282L199 312" fill="none" stroke="#59482f" strokeWidth="3"/>
          <circle cx="205" cy="299" r="1.6" fill="#e4c28e" stroke="none"/>
          <g className="guardian-arm-left-rest" fill="url(#guardian-skin)"><path d="M124 294Q107 321 114 353Q115 369 126 365Q135 362 129 351Q126 326 142 307Z"/><path d="M117 350L122 356" fill="none" strokeWidth="2"/></g>
          <g className="guardian-arm-right-rest" fill="url(#guardian-skin)"><path d="M278 295Q293 323 286 354Q285 369 274 365Q266 362 272 351Q275 327 260 307Z"/><path d="M282 351L277 357" fill="none" strokeWidth="2"/></g>
          <g className="guardian-head">
            <path d="M85 126C61 94 79 52 121 36C159 17 230 16 272 34C318 51 337 91 314 124Q294 153 249 166L244 222Q238 255 202 258Q166 257 156 226L150 166Q106 157 85 126Z" fill="url(#guardian-skin)"/>
            <path d="M90 115Q77 84 104 60" fill="none" stroke="#c5e7d9" strokeWidth="5" opacity=".45"/>
            <g fill="#558f88" stroke="none" opacity=".65"><ellipse cx="121" cy="53" rx="6" ry="3.5" transform="rotate(-28 121 53)"/><ellipse cx="155" cy="38" rx="6" ry="3"/><ellipse cx="201" cy="32" rx="6" ry="3"/><ellipse cx="248" cy="41" rx="6" ry="3" transform="rotate(15 248 41)"/><ellipse cx="282" cy="60" rx="5" ry="3" transform="rotate(35 282 60)"/></g>
            <path d="M151 83Q192 68 237 81M148 97Q194 81 241 94M152 111Q196 95 242 108" fill="none" stroke="#376b67" strokeWidth="2.3"/>
            <g className="guardian-eyes-open">
              <path d="M144 135Q161 121 189 132L196 166Q196 193 175 197Q151 196 147 172Z" fill="#f5e8b9"/>
              <path d="M199 132Q226 122 246 134L244 172Q242 194 222 197Q201 194 198 168Z" fill="#f5e8b9"/>
              <g style={{ transform: `translate(${gaze}px, 0)` }} fill="#8a3b25" stroke="none"><rect x="174" y="154" width="9" height="24" rx="3"/><rect x="216" y="154" width="9" height="24" rx="3"/></g>
              <path d="M144 135Q164 122 190 132L194 155L147 157Z" fill="#8cbeb0"/>
              <path d="M199 132Q224 123 246 134L245 157L199 155Z" fill="#8cbeb0"/>
            </g>
            <g className="guardian-eyes-closed" fill="none"><path d="M148 158Q170 169 192 157M201 157Q223 169 244 158"/></g>
            <path d="M162 223Q198 216 236 224M157 220L161 227M236 220L240 227" fill="none" strokeWidth="2.6"/>
            <path d="M191 163Q172 196 177 225Q180 247 197 250Q218 250 221 231Q224 206 204 164" fill="url(#guardian-skin)"/>
            <path d="M185 225Q184 235 193 239" fill="none" stroke="#c0e1d1" strokeWidth="3" opacity=".5"/>
          </g>
          {/* Raised arms render in front of the face; both palms actually cover the eyes. */}
          <g className="guardian-cover-eyes" fill="url(#guardian-skin)">
            <g className="guardian-cover-left">
              <path d="M128 300Q96 289 102 243Q106 208 137 174L150 190Q127 219 125 244Q123 267 143 281Z"/>
              <path d="M139 181Q130 166 137 150L146 132Q151 125 157 132L160 143L163 126Q166 119 173 123Q178 126 176 141L181 131Q187 125 192 132L190 150Q200 149 201 158L197 181Q190 199 173 200Q151 199 139 181Z"/>
              <path d="M157 143L154 162M176 141L173 162M190 150L186 167" fill="none" stroke="#518781" strokeWidth="2"/>
            </g>
            <g className="guardian-cover-right">
              <path d="M273 300Q306 288 299 243Q294 208 263 174L250 190Q274 219 276 244Q279 267 258 281Z"/>
              <path d="M261 181Q270 166 263 150L254 132Q249 125 243 132L240 143L237 126Q234 119 227 123Q222 126 224 141L219 131Q213 125 208 132L210 150Q200 149 199 158L203 181Q210 199 227 200Q249 199 261 181Z"/>
              <path d="M243 143L246 162M224 141L227 162M210 150L214 167" fill="none" stroke="#518781" strokeWidth="2"/>
            </g>
          </g>
          <g className="guardian-thumbs-up" fill="url(#guardian-skin)">
            <path d="M268 294Q294 300 309 272L316 251L301 238Q286 258 276 261L262 280Z"/>
            <path d="M302 251Q291 243 297 231L307 213L309 190Q312 179 319 185Q326 191 323 213L338 215Q349 217 346 229L340 250Q338 259 327 260Z"/>
            <path d="M329 223L343 227M326 234L341 238M323 245L337 249" fill="none" stroke="#518781" strokeWidth="2"/>
          </g>
        </g>
        <g className="guardian-hearts" fill="#b6e4ff"><path d="M307 109C288 91 285 119 307 130C329 117 327 92 307 109Z"/><path d="M80 214C66 200 63 221 80 229C96 220 95 201 80 214Z"/></g>
      </svg>
    </div>
  );
}
