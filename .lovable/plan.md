

## Plan: Create Pickles, Snacks, Orders & Contact Pages with Real Product Data

### Product Data (from uploaded image)

**Non-Veg Pickles (250g):**
Chicken Pickle ₹250, Boneless Chicken Pickle ₹300, Gongura Chicken Pickle ₹300, Prawns Pickle ₹400, Gongura Prawns Pickle ₹400, Mutton Pickle ₹400, Boneless Mutton Pickle ₹450, Gongura Mutton Pickle ₹450, Menthikura Mutton Pickle ₹450, Fish Pickle ₹350, Korrameenu Pickle ₹400, Boiled Egg Pickle (price TBD)

**Veg Pickles (250g):**
Mango ₹100, Tomato ₹100, Gongura ₹100, Amla ₹100, Lemon ₹100, Pandu Mirchi ₹100, Garlic ₹100, Tamarind ₹100, Coriander ₹100

**Snacks:**
Chekkalu ₹140, Chethi Chekkalu ₹140, Boondi ₹140, Sanna Pusa ₹140, Muruku ₹140, Pappu Chekodi ₹140, Maida Tea Chips ₹140, Sakinalu ₹140, Arishelu ₹140

### Changes

#### 1. Create `src/pages/Pickles.tsx`
- Navbar at top
- Two sections: "Non-Veg Pickles" and "Veg Pickles"
- Each product as a card: image placeholder, name, short description (written in the same bold, punchy tone as the existing chicken pickle copy — e.g. "Slow-cooked in pure groundnut oil. Bold, fiery, no shortcuts."), price, quantity selector (+/-), "Add to Cart" button (orange #FF8900, links to WhatsApp)
- Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop

#### 2. Create `src/pages/Snacks.tsx`
- Same layout as Pickles but single section "Our Snacks"
- 9 snack items with descriptions in the same tone (e.g. "Crunchy, golden, handmade. Perfect with chai.")

#### 3. Create `src/pages/Orders.tsx`
- Title: "Place Your Order"
- Form: Name, Mobile Number, Email, Product/Quantity query (textarea)
- Primary submit button (orange #FF8900)
- Secondary WhatsApp CTA (green #25D366 with WhatsApp SVG icon) linking to `wa.me/919999999999`

#### 4. Create `src/pages/Contact.tsx`
- Title: "Get in Touch"
- Form: Name, Phone, Email, Query (textarea)
- Gray map placeholder box
- Primary WhatsApp CTA (green #25D366 with WhatsApp icon)

#### 5. Update `src/App.tsx`
- Add routes: `/pickles`, `/snacks`, `/orders`, `/contact`

#### 6. Update `src/components/Navbar.tsx`
- Use React Router `useNavigate`
- "Our Story" → scroll to `/#story` (or `#story` if on homepage)
- "Pickles" → `/pickles`
- "Snacks" → `/snacks`
- "Abroad Orders" → `/orders`
- "Contact Us" → `/contact`

### Description Tone Examples
Matching the existing style — short, punchy, sensory:
- Chicken Pickle: "The OG. Slow-cooked in groundnut oil with sun-dried spices. Bold, fiery, unforgettable."
- Prawns Pickle: "Coastal heat meets Hyderabadi masala. Rich, tangy, deeply satisfying."
- Mango Pickle: "Raw mango, aged to perfection. Sharp, tangy, pure nostalgia."
- Chekkalu: "Crispy rice crackers, handmade the old way. Addictive with every bite."

### Technical Notes
- All pages include Navbar component
- Consistent styling: same fonts (font-body, font-navbar), same color palette
- Product data stored as typed arrays in each page file
- WhatsApp links pre-fill with product name and quantity

