# Prompt: Sklep Internetowy Maluga Design

---

```
Wcielasz się w rolę Creative Developera i UX Designera z głęboką wiedzą w zakresie estetyki marek luksusowych, motion designu i nowoczesnej architektury React. Twoja praca musi odzwierciedlać następującą filozofię marki: **Minimalizm. Ponadczasowość. Harmonia. Prostota. Natura. Filozofia koloru i formy.**

Nie śpiesz się. Myśl jak senior creative director zanim napiszesz choćby jedną linię kodu. Każda decyzja — od odstępów po krzywe animacji — musi służyć marce.

---

## OPIS PROJEKTU

Zbuduj wizualnie oszałamiające, produkcyjne demo sklepu internetowego dla marki biżuterii handmade w stylu minimalistycznym. Strona powinna wyglądać jak połączenie magazynu Kinfolk i skandynawskiej galerii. To nie jest sklep — to *doświadczenie*.

---

## STACK TECHNICZNY (bezwzględnie wymagany)

- **Next.js 14** z App Router (katalog `app/`)
- **TypeScript** — tryb strict, zero `any`
- **Tailwind CSS** — rozszerz motyw; nie nadużywaj wartości arbitralnych
- **Framer Motion** — dla wszystkich znaczących animacji
- **Lucide React** — tylko do ikon, wyłącznie tam gdzie naprawdę potrzebne

---

## STRUKTURA FOLDERÓW

Wygeneruj dokładnie tę strukturę:

```
app/
  layout.tsx
  page.tsx                  ← Strona główna
  products/
    [slug]/
      page.tsx              ← Strona szczegółów produktu
components/
  layout/
    Navbar.tsx
    Footer.tsx
  sections/
    HeroSection.tsx
    AboutSection.tsx
    ProductGrid.tsx
  ui/
    ProductCard.tsx
    ProductModal.tsx        ← opcjonalna alternatywa dla modala
    AnimatedText.tsx
lib/
  products.ts               ← dane produktów + typy
  utils.ts
public/
  img/
    profile/                ← banner.jpg, profile.jpg
    products/               ← 5 podfolderów, każdy = jeden produkt
```

---

## ZASOBY GRAFICZNE

### Zdjęcia profilowe
Znajdują się w `/public/img/profile/`:
- `banner.jpg` — użyj jako tło sekcji Hero
- `profile.jpg` — użyj w sekcji O autorce

### Zdjęcia produktów
Znajdują się w `/public/img/products/` — jest tam **5 podfolderów**. Każdy folder reprezentuje jeden produkt. Nazwy folderów są Twoim briefem kreatywnym.

**Kluczowa instrukcja:** Uważnie przeczytaj nazwę każdego folderu. Na jej podstawie wygeneruj kompletny obiekt produktu zawierający:
- `name` — poetycka nazwa produktu (od jednego do trzech słów)
- `slug` — slug bezpieczny dla URL
- `price` — realistyczna cena luksusowej biżuterii handmade (np. "285 PLN")
- `shortDescription` — jedno sugestywne zdanie (max 15 słów), jak podpis muzealny
- `longDescription` — trzy do czterech zdań napisanych w tonie wysokiej klasy editorial storytellingu. Odwołaj się do natury, rzemiosła, intencji, materiału i czasu. Zero marketingowych klisz.
- `material` — np. "Srebro próby 925, perła rzeczna"
- `images` — tablica ścieżek do wszystkich zdjęć w danym folderze (wzorzec: `/img/products/[nazwa-folderu]/*`)
- `category` — np. "pierścionki", "naszyjniki", "kolczyki"

Przechowuj wszystkie dane produktów w `lib/products.ts` jako typowaną tablicę z interfejsem `Product`.

---

## SYSTEM DESIGNU

### Typografia
- **Przewodnia czcionka marki (wszystko):** `Quicksand` w wadze 300 (Thin) — załaduj przez `next/font/google` z `weights: ['300', '400', '500']`
- **Nagłówki (H1, H2):** Quicksand weight 300, bardzo szerokie `letter-spacing` (`tracking-[0.2em]`), wersaliki — daje efekt luksusowego, geometrycznego minimalizmu
- **Tekst / UI / przyciski:** Quicksand weight 400 lub 300
- **Akcenty i cytaty:** Quicksand weight 300 w italic (`font-light italic`) — zamiast fontów szeryfowych
- Zastosuj font przez zmienną CSS `--font-quicksand` w `layout.tsx` i odwołuj się do niej w `tailwind.config.ts` jako `fontFamily: { sans: ['var(--font-quicksand)', ...defaultTheme.fontFamily.sans] }`
- Quicksand Thin nadaje stronie geometryczną miękkość — okrągłe formy liter współgrają z estetyką biżuterii; nie używaj innych fontów bez wyraźnej potrzeby

### Paleta kolorów
Rozszerz `tailwind.config.ts` o te własne kolory:

```js
colors: {
  stone: {
    50:  '#faf9f7',   // tło off-white
    100: '#f0ede8',   // ciepła biel
    200: '#e3ddd5',   // beż
    300: '#c8bfb3',   // jasny taupe
    400: '#a89d8e',   // taupe
    500: '#8a7d6e',   // ciepła szarość
  },
  ink: {
    900: '#1a1915',   // głęboka czerń
    800: '#2c2a26',   // ciemny antracyt
  },
  gold: {
    DEFAULT: '#b8a082',  // stonowane złoto (akcent)
    light:   '#d4c4a8',
  }
}
```

### Filozofia odstępów i ruchu
- Hojne odstępy. Przestrzeń do oddychania jest decyzją projektową.
- Animacje muszą być **powolne i celowe**, nigdy rwące. Używaj easing jak `[0.25, 0.1, 0.25, 1]` lub `easeInOut` z czasem trwania między `0.6s` a `1.2s`.
- Stagger dla elementów dzieci w gridach i listach.
- Zero odbić, zero sprężyn (chyba że bardzo subtelne).

---

## SPECYFIKACJA KOMPONENTÓW

### 1. `Navbar.tsx`
- Pozycja fixed, pełna szerokość
- **Efekt glassmorphism:** `backdrop-blur-md`, `bg-stone-50/60`, `border-b border-stone-200/40`
- Po lewej: nazwa marki w Quicksand weight 300, wersaliki, tracking widest — `MALUGA DESIGN`
- Po prawej: linki nawigacyjne w Quicksand weight 300, tracking wider — "Kolekcja", "O Mnie", "Kontakt" — plus subtelna ikona koszyka (Lucide `ShoppingBag`)
- Przy scrollowaniu: animuj opacity dolnej krawędzi od 0 do widocznej za pomocą Framer Motion `useScroll`
- Mobile: menu hamburger z wysuwaną nakładką pełnoekranową, również glassmorphism

### 2. `HeroSection.tsx`
- Pełna wysokość viewportu (`min-h-screen`)
- Tło: `banner.jpg` z `object-cover`, subtelna ciemna nakładka (`bg-ink-900/30`)
- Treść na pierwszym planie wyśrodkowana pionowo i poziomo
- Animowane wejście za pomocą Framer Motion — stagger tych elementów:
  1. Cienka ozdobna linia (pozioma kreska) pojawia się z fade
  2. Podtytuł pojawia się z fade w górę: np. "Biżuteria handmade w stylu minimalistycznym"
  3. Główny H1 pojawia się z fade w górę: `MALUGA DESIGN` w dużym Quicksand weight 300, bardzo szerokie letter-spacing (`tracking-[0.3em]`), wersaliki
  4. Krótki poetycki tagline pojawia się z fade w górę: np. *"Każdy element opowieść. Każdy metal — naturą."*
  5. Przycisk CTA wysuwa się w górę: "Odkryj kolekcję" — minimalistyczny styl outline, bez wypełnienia, z animacją wypełnienia przy hover
- Subtelny parallax przy scrollowaniu (Framer Motion `useScroll` + `useTransform`)

### 3. `AboutSection.tsx`
- Układ dwukolumnowy na desktopie, ułożony jeden pod drugim na mobile
- Lewa kolumna: `profile.jpg` — pełna wysokość, lekki filtr szarości który znika przy hover (`filter grayscale-[30%] hover:grayscale-0 transition-all duration-700`)
- Prawa kolumna:
  - Małe oznaczenie wersalikami: "O twórczyni"
  - H2 w Quicksand weight 300, tracking wide: np. *"Forma rodzi się z ciszy"*
  - Dwa akapity w DM Sans, stone-500, opisujące filozofię twórczyni: powolne rzemiosło, materiały z natury, rytuał ręcznego tworzenia, relacja między biżuterią a ciałem
  - Krótka lista (3 elementy) z cienką złotą linią separatora: np. "Srebro próby 925", "Kamienie naturalne", "Każda sztuka unikatowa"
- Sekcja animuje się przy scrollowaniu za pomocą Framer Motion `whileInView` z `once: true`

### 4. `ProductGrid.tsx`
- Tytuł sekcji: "Kolekcja" w H2 Quicksand weight 300, wersaliki, tracking widest, wyśrodkowany, z cienką ozdobną linią poniżej
- Responsywny grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` z hojnym odstępem
- Każda karta renderowana przez `ProductCard.tsx`
- Animacja stagger: karty pojawiają się kolejno przy wejściu w viewport

### 5. `ProductCard.tsx`
- Współczynnik proporcji 3:4 — wysoka karta, portretowa orientacja
- Zdjęcie wypełnia kartę z `object-cover`
- Przy hover:
  - Zdjęcie skaluje się subtelnie: `scale(1.04)`, płynne przejście
  - Ciemna nakładka pojawia się od dołu (gradient od transparentnego do `ink-900/70`)
  - Nazwa produktu i cena wysuwają się od dolnej krawędzi
  - Pojawia się cienki link "Zobacz więcej"
- Poniżej zdjęcia: nazwa produktu w Quicksand weight 300, tracking wide; cena w Quicksand weight 400, stone-500
- Kliknięcie karty nawiguje do `/products/[slug]`
- Zero zaokrąglenia rogów — ostre, architektoniczne krawędzie

### 6. Strona szczegółów produktu `/products/[slug]/page.tsx`
- Układ dwukolumnowy: galeria zdjęć po lewej, szczegóły po prawej
- Po lewej: główne zdjęcie duże, miniatury poniżej — kliknięcie miniatury zmienia główne zdjęcie (useState)
- Po prawej:
  - Breadcrumb: "Kolekcja / [kategoria]"
  - Nazwa produktu w dużym Quicksand weight 300, tracking wide, wersaliki
  - Cena w kolorze złotym
  - Linia materiału z małą ikoną Lucide `Gem`
  - `longDescription` renderowany z hojną wysokością linii
  - Przycisk "Dodaj do koszyka" — pełna szerokość, ciemne wypełnienie (ink-900), kremowy tekst, subtelne uniesienie przy hover
  - Notka poniżej: "Handcrafted. Each piece is unique." w małym italic stone-400
- Wszystkie elementy animują się przy wczytaniu strony za pomocą Framer Motion

### 7. `Footer.tsx`
- Minimalistyczny: wyśrodkowana nazwa marki `MALUGA DESIGN` w Quicksand weight 300, tracking widest; linki nav w jednej linii, cienka linia, copyright
- Tło: `ink-900`, tekst `stone-300`
- Opcjonalnie: jedna linia poetyckiego copy, np. *"Tworzone z intencją. Noszone z miłością."*

---

## WYMAGANIA DOTYCZĄCE JAKOŚCI KODU

- Wszystkie komponenty w TypeScript z jawnie typowanymi propsami
- Zero typów `any` — używaj właściwych interfejsów
- Używaj `Image` z `next/image` dla wszystkich zdjęć z właściwym `alt`, `width`, `height` i `priority` tam gdzie odpowiednie
- Używaj `Link` z `next/link` dla całej wewnętrznej nawigacji
- Dostępność: semantyczny HTML (`main`, `section`, `nav`, `article`), `aria-label` na przyciskach z ikonami
- Zero inline styles — tylko klasy Tailwind
- Warianty Framer Motion definiowane poza renderem komponentu, aby unikać ponownego tworzenia
- Komponenty maksymalnie ~120 linii; wyodrębnij subkomponenty jeśli potrzeba

---

## TON I STYL PISANIA (dla wszystkich generowanych tekstów)

Pisz jakbyś tworzył dla marki, która wierzy: *biżuteria to nie ozdoba — to pamięć, materiał i czas uczyniony do noszenia.*

Unikaj: "kup teraz", "rabat", "wyprzedaż", "promocja".
Używaj zamiast tego: "odkryj", "historia", "forma", "cisza", "natura", "czas", "intencja", "rzemiosło".

Język: polski dla etykiet UI i tekstów marketingowych. Angielski dopuszczalny dla metadanych technicznych.

---

## EFEKT KOŃCOWY

Dostarcz kompletny, działający kod dla każdego pliku wymienionego w strukturze folderów. Zacznij od `tailwind.config.ts`, następnie `app/layout.tsx`, potem każdy komponent po kolei.

Przed napisaniem kodu, wygeneruj jeden krótki akapit (max 5 zdań) zatytułowany **"Kierunek Kreatywny"**, który podsumowuje podjęte decyzje dotyczące identyfikacji wizualnej i ich uzasadnienie. Zapewni to zgodność z wizją przed implementacją.

Nie używaj komentarzy `// TODO`. Każda funkcja musi być zaimplementowana. Każda animacja musi być zdefiniowana. To jest wersja finalna.
```
