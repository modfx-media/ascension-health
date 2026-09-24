export type NavChild = { label: string; href: string };
export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const SITE = {
  phone: "(775) 575-9922",
  phoneHref: "tel:+17755759922",
  address: "415 HWY 95A Suite 503, Fernley, NV 89408",
  mapsHref:
    "https://www.google.com/search?sca_esv=17f5dce0afacffdc&hl=en&authuser=0&sxsrf=APpeQnvbGhIomYhON7mZ_6owQq7m2MSyaw:1788182826613&kgmid=/g/11hdnygs_d&q=Ascension+Health+%7C+Joint+and+Back+Pain+Clinic&shem=dlvs1,epsd1,ltae,rimspwouoe&shndl=30&source=sh/x/loc/uni/m1/1&kgs=d887d0045188ce84&utm_source=dlvs1,epsd1,ltae,rimspwouoe,sh/x/loc/uni/m1/1",
  appointmentsHref: "/appointments/",
  hours: "Mon–Thu · 9:00am – 6:00pm",
  social: {
    facebook:
      "https://www.facebook.com/Ascension-Chiropractic-734015263631952",
    google:
      "https://www.google.com/search?sca_esv=17f5dce0afacffdc&hl=en&authuser=0&sxsrf=APpeQnvbGhIomYhON7mZ_6owQq7m2MSyaw:1788182826613&kgmid=/g/11hdnygs_d&q=Ascension+Health+%7C+Joint+and+Back+Pain+Clinic&shem=dlvs1,epsd1,ltae,rimspwouoe&shndl=30&source=sh/x/loc/uni/m1/1&kgs=d887d0045188ce84&utm_source=dlvs1,epsd1,ltae,rimspwouoe,sh/x/loc/uni/m1/1",
    twitter: "https://twitter.com/AscensionChiro1",
  },
};

export const NAVIGATION: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about/",
    children: [
      { label: "Our Team", href: "/our-team/" },
      { label: "Blog", href: "/blog/" },
      { label: "Reviews", href: "/reviews/" },
    ],
  },
  {
    label: "New Patients",
    href: "/new-patients/",
    children: [
      { label: "Online Forms", href: "/new-patients/online-forms/" },
    ],
  },
  { label: "Appointments", href: "/appointments/" },
  {
    label: "Services",
    href: "/services/",
    children: [
      { label: "Joint Injections", href: "/services/joint-injections/" },
      { label: "Trigger Point Injections", href: "/services/trigger-point-injections/" },
      { label: "Chiropractic Care", href: "/services/chiropractic-care/" },
      { label: "Nutritional IVs", href: "/services/nutritional-ivs/" },
      {
        label: "Bioidentical Hormone Replacement Therapy",
        href: "/services/bioidentical-hormone-replacement-therapy/",
      },
      { label: "Spinal Decompression", href: "/services/spinal-decompression/" },
      { label: "GAINSWave®", href: "/services/gainswave/" },
      { label: "Medical Weight Loss", href: "/services/medical-weight-loss/" },
    ],
  },
  {
    label: "Conditions Treated",
    href: "/conditions-treated/",
    children: [
      { label: "Back Pain", href: "/conditions-treated/back-pain/" },
      { label: "Neck Pain", href: "/conditions-treated/neck-pain/" },
      { label: "Shoulder Pain", href: "/conditions-treated/shoulder-pain/" },
      { label: "Sciatica", href: "/conditions-treated/sciatica/" },
      { label: "Headaches & Migraines", href: "/conditions-treated/headaches-migraines/" },
      { label: "Myofascial Release", href: "/conditions-treated/myofascial-release/" },
      { label: "Intersegmental Traction", href: "/conditions-treated/intersegmental-traction/" },
      { label: "Sexual Dysfunction", href: "/conditions-treated/sexual-dysfunction/" },
      { label: "Hormonal Imbalance", href: "/conditions-treated/hormonal-imbalance/" },
      { label: "Neuropathy", href: "/conditions-treated/neuropathy/" },
      { label: "Pain Relief", href: "/conditions-treated/pain-relief/" },
      { label: "Joint Pain", href: "/conditions-treated/joint-pain/" },
      { label: "Knee Pain", href: "/conditions-treated/knee-pain/" },
    ],
  },
  { label: "Contact", href: "/contact/" },
];
