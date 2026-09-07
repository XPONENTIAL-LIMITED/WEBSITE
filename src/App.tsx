import { useState, useEffect, useRef } from "react"
import xponentialMark from "./imports/Xponential_X_transparent.png"

// ---- Scroll-in animation hook ----
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ---- Logo ----
function Logo({ light = false }: { light?: boolean }) {
  const wordColor = light ? "#ffffff" : "#111111"

  return (
    <span className="flex h-10 items-start gap-1 select-none md:h-12 md:gap-1.5">
      <img
        src={xponentialMark}
        alt="Xponential X mark"
        className="h-full w-auto object-contain"
      />
      <span
        className="font-black text-[1.05rem] leading-none tracking-[-0.02em] pt-1 md:pt-1.5 md:text-[1.3rem]"
        style={{ color: wordColor, WebkitTextStroke: `0.4px ${wordColor}` }}
      >
        PONENTIAL
      </span>
    </span>
  )
}

// ---- Nav ----
function Nav({ onContact }: { onContact: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Values", href: "#values" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        "bg-white border-b border-[#d9ddd9] shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        <Logo />

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-black/55 hover:text-black text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={onContact}
            className="text-black/70 border border-black/25 px-6 py-2 text-xs font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all duration-200"
          >
            Get in Touch
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-[2px] bg-black transition-all duration-300 origin-center ${
              menuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-black transition-all duration-300 ${
              menuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-black transition-all duration-300 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden bg-white border-b border-[#d9ddd9] overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-black/55 text-sm font-semibold tracking-[0.2em] uppercase"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false)
              onContact()
            }}
            className="mt-2 text-black/70 border border-black/25 px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase w-full text-left"
          >
            Get in Touch →
          </button>
        </div>
      </div>
    </nav>
  )
}

// ---- Hero ----
function Hero({ onContact }: { onContact: () => void }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-[700px] md:min-h-screen flex flex-col justify-end pb-20 md:pb-28 md:pt-44 overflow-hidden bg-[#060a06]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1573164574511-73c773193279?w=1600&h=900&fit=crop&auto=format"
          alt="Xponential professionals collaborating"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060a06] via-[#060a06]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060a06]/80 to-transparent" />
      </div>

      {/* Top eyebrow - fades in */}
      <div
        className={`absolute top-24 md:top-32 left-6 right-6 md:left-10 md:right-10 transition-all duration-700 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        <p className="text-white/35 font-mono text-[10px] leading-relaxed tracking-[0.22em] md:tracking-[0.35em] uppercase text-right">
          <span className="block sm:inline">Lusaka, Zambia</span>
          <span className="hidden sm:inline"> - </span>
          <span className="block sm:inline">Est. ICT Excellence</span>
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
        {/* Main headline */}
        <div
          className={`transition-all duration-700 delay-100 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h1
            className="font-black text-white leading-[0.88] mb-10 md:mb-14"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 10vw, 9rem)",
            }}
          >
            <span className="block">YOUR</span>
            <span className="block text-white/90">ICT</span>
            <span className="block">EXCELLENCE</span>
            <span className="block text-white/55">PARTNER.</span>
          </h1>
        </div>

        {/* Sub content */}
        <div
          className={`flex flex-col md:flex-row md:items-end gap-8 md:gap-20 transition-all duration-700 delay-200 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-white/45 text-base md:text-lg max-w-sm leading-relaxed">
            We plan, build, support and manage IT environments for businesses across Zambia  using technologies that are fit for purpose.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 shrink-0">
            <a
              href="#services"
              className="group inline-flex items-center gap-3 text-white font-bold text-sm tracking-wide border-b-2 border-white/30 pb-1 hover:border-white hover:text-white transition-all duration-200"
            >
              Explore Services
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
            <button
              onClick={onContact}
              className="inline-flex items-center gap-3 text-white/60 font-bold text-sm tracking-wide border-b-2 border-white/25 pb-1 hover:text-white hover:border-white transition-all duration-200"
            >
              Talk to Us →
            </button>
          </div>
        </div>
      </div>

      {/* Scroll line */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-14 bg-white/15 animate-pulse" />
      </div>
    </section>
  )
}

// ---- Services ----
type ServiceKey = "work" | "infra" | "services"

const SERVICE_DATA: Record<
  ServiceKey,
  {
    label: string
    headline: string
    description: string
    items: { cat: string; detail: string }[]
    image: string
    imageAlt: string
  }
> = {
  work: {
    label: "Smart Work",
    headline: "Every desk.\nEvery screen.",
    description:
      "We equip your workforce with exactly the right tools from user devices to workplace hardware and full collaboration platforms.",
    items: [
      {
        cat: "User",
        detail: "Tablets, Laptops, Desktops, Operating Systems & Applications",
      },
      {
        cat: "Workplace",
        detail: "Printers, Toners, CCTV, Access Control & UPS",
      },
      {
        cat: "Collaboration",
        detail: "Video Conferencing, IP Phone, Websites & Emails",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1684181417136-3b03e7352ab3?w=900&h=660&fit=crop&auto=format",
    imageAlt: "Professional using laptop in a modern workspace",
  },
  infra: {
    label: "Smart Infrastructure",
    headline: "Built to scale.\nBuilt to last.",
    description:
      "Robust, secure, and resilient infrastructure designed to handle the real demands of modern African enterprise.",
    items: [
      {
        cat: "Data Centre",
        detail: "Racks, Power, Cooling, Compute, Storage & Virtualization",
      },
      {
        cat: "Network",
        detail: "Local Area Networks & Wide Area Networks",
      },
      {
        cat: "Security",
        detail: "Application, Infrastructure, End Point & Cloud Security",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1629837093109-11325d6e7afd?w=900&h=660&fit=crop&auto=format",
    imageAlt: "ICT engineer working with server infrastructure",
  },
  services: {
    label: "Smart Services",
    headline: "With you.\nEvery step.",
    description:
      "From initial consultancy through to long-term managed services, we stay in your corner for every phase of the journey.",
    items: [
      {
        cat: "Technical",
        detail: "Consultancy, Design & Installation",
      },
      {
        cat: "Support",
        detail: "After-Sale Support & Ongoing Maintenance",
      },
      {
        cat: "Managed",
        detail: "Different Technology as a Service",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1573164713712-03790a178651?w=900&h=660&fit=crop&auto=format",
    imageAlt: "ICT professional providing expert support",
  },
}

function Services() {
  const [active, setActive] = useState<ServiceKey>("work")
  const { ref, inView } = useInView()
  const data = SERVICE_DATA[active]

  return (
    <section
      id="services"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-24 md:py-36 bg-[#060a06] transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-14 md:mb-20">
          <p className="text-white/35 font-mono text-[10px] tracking-[0.35em] uppercase mb-5">
            Our Portfolio
          </p>
          <h2
            className="font-black text-white leading-[0.88] mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 6vw, 5rem)",
            }}
          >
            WHAT WE
            <br />
            DO BEST.
          </h2>
          <div className="w-12 h-[2px] bg-white/20" />
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row border border-[#303330] mb-14">
          {(Object.keys(SERVICE_DATA) as ServiceKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`flex-1 py-4 px-6 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-200 text-left sm:text-center border-b sm:border-b-0 sm:border-r border-[#303330] last:border-0 ${
                active === key
                  ? "bg-[#5ab350] text-black"
                  : "text-white/45 hover:text-white hover:bg-[#0d160d]"
              }`}
            >
              {SERVICE_DATA[key].label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <h3
              className="font-black text-white leading-[0.92] mb-6 whitespace-pre-line"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
              }}
            >
              {data.headline}
            </h3>
            <p className="text-white/45 text-base md:text-lg mb-10 leading-relaxed">
              {data.description}
            </p>
            <div className="flex flex-col gap-7">
              {data.items.map((item) => (
                <div key={item.cat} className="flex gap-5">
                  <div className="shrink-0 w-[2px] bg-white/20 mt-1 self-stretch min-h-[2.5rem]" />
                  <div>
                    <span className="text-white/45 font-bold text-[10px] tracking-[0.25em] uppercase block mb-1">
                      {item.cat}
                    </span>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative bg-[#0d160d] overflow-hidden">
            <img
              src={data.image}
              alt={data.imageAlt}
              className="w-full h-[300px] md:h-[420px] object-cover transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-[#060a06]/15" />
          </div>
        </div>
      </div>
    </section>
  )
}

// ---- About ----
function About() {
  const { ref, inView } = useInView()

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-24 md:py-36 bg-[#080d08] transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-14 md:gap-24 items-start">
          {/* Image column */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1655720357872-ce227e4164ba?w=800&h=700&fit=crop&auto=format"
              alt="Xponential team reviewing solutions together"
              className="w-full h-[380px] md:h-[540px] object-cover"
            />
            <div className="absolute -bottom-4 -right-4 w-40 h-40 border border-white/8 pointer-events-none hidden md:block" />
            {/* Stat badge */}
            <div className="absolute bottom-8 left-0 bg-[#060a06] border-t border-r border-[#303330] p-6">
              <p
                className="font-black text-white leading-none"
                style={{ fontFamily: "var(--font-display)", fontSize: "3rem" }}
              >
                3
              </p>
              <p className="text-white/45 text-[10px] tracking-[0.25em] uppercase mt-1">
                Core Specializations
              </p>
            </div>
          </div>

          {/* Text column */}
          <div>
            <p className="text-white/35 font-mono text-[10px] tracking-[0.35em] uppercase mb-5">
              Who We Are
            </p>
            <h2
              className="font-black text-white leading-[0.88] mb-8"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
              }}
            >
              TRUSTED.
              <br />
              EXPERIENCED.
              <br />
              ZAMBIAN.
            </h2>
            <p className="text-white/45 text-base md:text-lg leading-relaxed mb-5">
              XPONENTIAL was founded with a clear vision to offer excellent ICT Services and Infrastructure. We are a specialised Solutions Provider that helps businesses plan, build, support and manage different IT environments.
            </p>
            <p className="text-white/45 text-base md:text-lg leading-relaxed mb-12">
              We strive to be a trusted partner with a clear understanding of our customers&apos; operations, enabling them to achieve desired business outcomes. We adapt across different industries using our deep experience.
            </p>

            {/* Vision / Mission */}
            <div className="grid grid-cols-2 gap-px bg-[#303330]">
              <div className="bg-[#080d08] p-6">
                <p className="text-white/35 font-mono text-[10px] tracking-[0.25em] uppercase mb-3">
                  Vision
                </p>
                <p className="text-white text-sm leading-relaxed">
                  Be the most valued ICT service provider
                </p>
              </div>
              <div className="bg-[#080d08] p-6">
                <p className="text-white/35 font-mono text-[10px] tracking-[0.25em] uppercase mb-3">
                  Mission
                </p>
                <p className="text-white text-sm leading-relaxed">
                  To serve our Customers with Excellence
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---- Values ----
const VALUES = [
  {
    letter: "S",
    word: "Synergy",
    desc: "We believe in the power of unity. One plus one is greater than two.",
  },
  {
    letter: "E",
    word: "Excellence",
    desc: "We strive to serve our customers with excellence in every engagement.",
  },
  {
    letter: "E",
    word: "Expertize",
    desc: "We continue learning and push to be fully competent in everything we do.",
  },
  {
    letter: "I",
    word: "Integrity",
    desc: "We always do the right thing, without exception.",
  },
  {
    letter: "T",
    word: "Trust",
    desc: "We guarantee the confidence placed in us by every client and partner.",
  },
]

function Values() {
  const { ref, inView } = useInView()

  return (
    <section
      id="values"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-24 md:py-36 bg-[#060a06] transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-14 md:mb-20">
          <p className="text-white/35 font-mono text-[10px] tracking-[0.35em] uppercase mb-5">
            Core Values
          </p>
          <h2
            className="font-black text-white leading-[0.88]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 6vw, 5rem)",
            }}
          >
            WHAT DRIVES
            <br />
            US FORWARD.
          </h2>
        </div>

        <div className="divide-y divide-[#303330]">
          {VALUES.map((v, i) => (
            <div
              key={v.word}
              className="group flex items-start gap-6 md:gap-14 py-7 md:py-9 hover:bg-[#0d160d] transition-colors duration-200 px-4 -mx-4"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span
                className="font-black text-white/10 group-hover:text-white/50 transition-colors duration-300 leading-none shrink-0 w-12 md:w-20 text-center"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                }}
              >
                {v.letter}
              </span>
              <div className="flex flex-col md:flex-row md:items-center md:gap-10 flex-1 pt-1">
                <h3
                  className="font-black text-white text-lg md:text-2xl md:w-44 shrink-0"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {v.word}
                </h3>
                <p className="text-white/45 text-sm md:text-base leading-relaxed mt-1 md:mt-0">
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Team image strip */}
        <div className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-3 gap-px bg-[#303330]">
          <div className="bg-[#060a06] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1573164574397-dd250bc8a598?w=600&h=340&fit=crop&auto=format"
              alt="Xponential professionals in a business setting"
              className="w-full h-40 md:h-52 object-cover opacity-70 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          <div className="bg-[#060a06] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1573164574511-73c773193279?w=600&h=340&fit=crop&auto=format"
              alt="Team collaboration session"
              className="w-full h-40 md:h-52 object-cover opacity-70 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          <div className="bg-[#060a06] overflow-hidden col-span-2 md:col-span-1">
            <img
              src="https://images.unsplash.com/photo-1573166475912-1ed8b4f093d2?w=600&h=340&fit=crop&auto=format"
              alt="Xponential professional"
              className="w-full h-40 md:h-52 object-cover opacity-70 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ---- Partners ----
const PARTNERS = [
  { name: "HPE", logo: "https://cdn.simpleicons.org/hpe/111111" },
  { name: "Lenovo", logo: "https://cdn.simpleicons.org/lenovo/111111" },
  { name: "Google", logo: "https://cdn.simpleicons.org/google/111111" },
]

function Partners() {
  return (
    <section className="border-y border-[#d9ddd9] bg-white py-12 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-9 md:mb-11">
        <p className="text-black/45 font-mono text-[10px] tracking-[0.35em] uppercase mb-3">
          Technology Partners
        </p>
        <p className="max-w-xl text-black/65 text-sm md:text-base leading-relaxed">
          Trusted technology from partners who help us deliver practical, dependable solutions.
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="partners-track flex w-max">
          {[...PARTNERS, ...PARTNERS].map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex items-center justify-center gap-4 w-[14rem] md:w-[22rem] h-16 md:h-20 border-r border-[#d9ddd9] px-8 md:px-16"
              aria-hidden={index >= PARTNERS.length}
            >
              <img
                src={partner.logo}
                alt={index < PARTNERS.length ? `${partner.name} logo` : ""}
                className="h-8 md:h-10 w-8 md:w-10 opacity-75 transition-opacity duration-300"
              />
              <span className="text-black/75 font-semibold text-sm md:text-base whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---- Contact form (shared logic) ----
type ContactForm = {
  name: string
  email: string
  company: string
  message: string
}

function sendEmail(form: ContactForm) {
  const subject = encodeURIComponent("Enquiry from " + form.name)
  const body = encodeURIComponent(
    "Name: " +
      form.name +
      "\nEmail: " +
      form.email +
      "\nCompany: " +
      form.company +
      "\n\n" +
      form.message
  )
  window.location.href =
    "mailto:solution@xponential.co.zm?subject=" + subject + "&body=" + body
}

// ---- Contact Section ----
function ContactSection() {
  const { ref, inView } = useInView()
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendEmail(form)
    setSent(true)
  }

  const inputClass =
    "w-full bg-transparent border border-[#303330] focus:border-white/50 text-white px-4 py-3 text-sm outline-none transition-colors duration-200 placeholder:text-white/35"

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-24 md:py-36 bg-[#080d08] transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-14 md:gap-24">
          {/* Left info */}
          <div>
            <p className="text-white/35 font-mono text-[10px] tracking-[0.35em] uppercase mb-5">
              Get in Touch
            </p>
            <h2
              className="font-black text-white leading-[0.88] mb-8"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
              }}
            >
              LET&apos;S BUILD
              <br />
              SOMETHING
              <br />
              GREAT.
            </h2>
            <p className="text-white/45 text-base md:text-lg leading-relaxed mb-12">
              Whether you are looking for an ICT solutions partner or want to explore a business relationship, we would love to hear from you.
            </p>

            <div className="flex flex-col gap-8">
              <div>
                <p className="text-white/35 font-mono text-[10px] tracking-[0.25em] uppercase mb-2">
                  Email
                </p>
                <a
                  href="mailto:solution@xponential.co.zm"
                  className="text-white hover:text-white/80 transition-colors font-medium underline underline-offset-4 text-sm"
                >
                  solution@xponential.co.zm
                </a>
              </div>
              <div>
                <p className="text-white/35 font-mono text-[10px] tracking-[0.25em] uppercase mb-2">
                  Phone
                </p>
                <a
                  href="tel:+260978990533"
                  className="text-white hover:text-white/80 transition-colors font-medium underline underline-offset-4 text-sm"
                >
                  +260 978 990 533
                </a>
              </div>
              <div>
                <p className="text-white/35 font-mono text-[10px] tracking-[0.25em] uppercase mb-2">
                  Address
                </p>
                <address className="text-white/45 text-sm leading-relaxed not-italic">
                  4 on Bishop Road
                  <br />
                  Kabulonga, Lusaka
                  <br />
                  Zambia
                </address>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div className="flex flex-col gap-5 py-12">
                <p
                  className="font-black text-white leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "5rem",
                  }}
                >
                  Done.
                </p>
                <p className="text-white/45 text-base leading-relaxed">
                  Your email client should open with the message pre-filled. We will get back to you shortly.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="text-white/50 text-sm font-bold tracking-wide border-b border-white/25 pb-0.5 w-fit hover:text-white hover:border-white transition-colors duration-200"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {[
                  { name: "name", label: "Full Name", type: "text", required: true, placeholder: "Your full name" },
                  { name: "email", label: "Email Address", type: "email", required: true, placeholder: "your@email.com" },
                  { name: "company", label: "Company / Organisation", type: "text", required: false, placeholder: "Optional" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-white/35 font-mono text-[10px] tracking-[0.25em] uppercase mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder}
                      value={form[field.name as keyof ContactForm]}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, [field.name]: e.target.value }))
                      }
                      className={inputClass}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-white/35 font-mono text-[10px] tracking-[0.25em] uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your project or enquiry"
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    className={inputClass + " resize-none"}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#5ab350] text-black font-black text-xs tracking-[0.2em] uppercase py-4 hover:bg-[#4a9c40] transition-colors duration-200"
                >
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ---- Footer ----
function Footer() {
  return (
    <footer className="bg-[#040804] border-t border-[#303330] py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div>
            <Logo light />
            <p className="text-white/45 text-xs mt-3 leading-relaxed">
              4 on Bishop Road, Kabulonga
              <br />
              Lusaka, Zambia
            </p>
            <a
              href="mailto:solution@xponential.co.zm"
              className="text-white/45 hover:text-white text-xs mt-2 block transition-colors duration-200"
            >
              solution@xponential.co.zm
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-white/35 font-mono text-[10px] tracking-[0.25em] uppercase mb-1">
              Navigation
            </p>
            {["about", "services", "values", "contact"].map((l) => (
              <a
                key={l}
                href={"#" + l}
                className="text-white/45 hover:text-white text-xs tracking-[0.15em] uppercase transition-colors duration-200"
              >
                {l}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-white/35 font-mono text-[10px] tracking-[0.25em] uppercase mb-1">
              Services
            </p>
            {["Smart Work", "Smart Infrastructure", "Smart Services"].map(
              (s) => (
                <a
                  key={s}
                  href="#services"
                  className="text-white/45 hover:text-white text-xs transition-colors duration-200"
                >
                  {s}
                </a>
              )
            )}
          </div>

          <div>
            <p className="text-white/35 font-mono text-[10px] tracking-[0.25em] uppercase mb-3">
              Contact
            </p>
            <a
              href="tel:+260978990533"
              className="text-white/45 hover:text-white text-xs block transition-colors duration-200"
            >
              +260 978 990 533
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#303330] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Xponential. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Smart Work &middot; Smart Infrastructure &middot; Smart Services
          </p>
        </div>
      </div>
    </footer>
  )
}

// ---- 404 Page ----
function NotFoundPage({ onHome }: { onHome: () => void }) {
  return (
    <div className="min-h-screen bg-[#060a06] flex flex-col items-start justify-center px-6 md:px-16 pt-24">
      <p className="text-white/35 font-mono text-[10px] tracking-[0.35em] uppercase mb-5">
        Error
      </p>
      <h1
        className="font-black text-white leading-none mb-3"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(6rem, 22vw, 14rem)",
        }}
      >
        404
      </h1>
      <div className="w-16 h-[2px] bg-white/20 mb-8" />
      <p className="text-white/45 text-lg md:text-xl mb-12 max-w-md leading-relaxed">
        This page does not exist. But our ICT solutions do.
      </p>
      <button
        onClick={onHome}
        className="group inline-flex items-center gap-3 text-white/60 font-bold text-sm tracking-wide border-b-2 border-white/25 pb-1 hover:text-white hover:border-white transition-all duration-200"
      >
        <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
        Return to Home
      </button>
    </div>
  )
}

// ---- Mobile Contact Sheet (mobile only) ----
function MobileContactSheet({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendEmail(form)
    setSent(true)
    setTimeout(() => {
      onClose()
      setSent(false)
      setForm({ name: "", email: "", company: "", message: "" })
    }, 2000)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 md:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      {/* Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0a0f0a] border-t border-[#303330] transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "88vh", overflowY: "auto" }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-7">
            <h3
              className="font-black text-white text-2xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Get in Touch
            </h3>
            <button
              onClick={onClose}
              className="text-white/45 hover:text-white text-3xl leading-none transition-colors duration-200"
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          {sent ? (
            <div className="py-8 text-center">
              <p
                className="font-black text-white text-5xl mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Sent!
              </p>
              <p className="text-white/45 text-sm">
                Opening your email client now...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {[
                { name: "name", label: "Name", type: "text", required: true },
                { name: "email", label: "Email", type: "email", required: true },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-white/35 font-mono text-[10px] tracking-[0.25em] uppercase mb-2">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    required={f.required}
                    value={form[f.name as keyof ContactForm]}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, [f.name]: e.target.value }))
                    }
                    className="w-full bg-transparent border border-[#303330] focus:border-white/50 text-white px-4 py-3 text-sm outline-none"
                  />
                </div>
              ))}
              <div>
                <label className="block text-white/35 font-mono text-[10px] tracking-[0.25em] uppercase mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  className="w-full bg-transparent border border-[#303330] focus:border-white/50 text-white px-4 py-3 text-sm outline-none resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#5ab350] text-black font-black text-xs tracking-[0.2em] uppercase py-4 hover:bg-[#4a9c40] transition-colors duration-200"
              >
                Send Message →
              </button>
            </form>
          )}

          {/* Contact info */}
          <div className="mt-6 pt-6 border-t border-[#303330] flex flex-col gap-3">
            <a
              href="tel:+260978990533"
              className="text-white/45 text-sm underline underline-offset-4 hover:text-white transition-colors duration-200"
            >
              +260 978 990 533
            </a>
            <a
              href="mailto:solution@xponential.co.zm"
              className="text-white/45 text-sm underline underline-offset-4 hover:text-white transition-colors duration-200"
            >
              solution@xponential.co.zm
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

// ---- App ----
export default function App() {
  const [page, setPage] = useState<"home" | "404">("home")
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    const check = () => {
      if (window.location.hash === "#404") setPage("404")
      else setPage("home")
    }
    check()
    window.addEventListener("hashchange", check)
    return () => window.removeEventListener("hashchange", check)
  }, [])

  return (
    <div className="bg-[#060a06] min-h-screen">
      <Nav onContact={() => setContactOpen(true)} />

      {page === "404" ? (
        <NotFoundPage
          onHome={() => {
            window.location.hash = ""
            setPage("home")
          }}
        />
      ) : (
        <>
          <Hero onContact={() => setContactOpen(true)} />
          <Services />
          <About />
          <Values />
          <Partners />
          <ContactSection />
          <Footer />
        </>
      )}

      {/* Mobile floating CTA - visible on mobile only */}
      <div
        className={`fixed bottom-6 right-6 z-40 md:hidden transition-all duration-300 ${
          contactOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <button
          onClick={() => setContactOpen(true)}
          className="bg-[#5ab350] text-black font-black text-[10px] tracking-[0.2em] uppercase px-5 py-3 shadow-xl hover:bg-[#4a9c40] transition-colors duration-200"
        >
          Contact Us
        </button>
      </div>

      {/* Mobile contact sheet */}
      <MobileContactSheet
        open={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  )
}
