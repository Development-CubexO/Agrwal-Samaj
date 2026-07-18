import shyamSunder from '../assets/mamber/Shyam-Sunder.png'
import navin from '../assets/mamber/navin.png'
import rajesh from '../assets/mamber/rajesh.png'
import prayog from '../assets/mamber/prayog.png'
import dinesh from '../assets/mamber/dinesh.png'
import pinki from '../assets/mamber/pinki.png'
import ankit from '../assets/mamber/ankit.png'
import ritesh from '../assets/mamber/ritesh.png'
import ajay from '../assets/mamber/ajay.png'
import amit from '../assets/mamber/amit.png'
import jayant from '../assets/mamber/jayant.png'
import rajendra from '../assets/mamber/rajendra.png'
import ratnesh from '../assets/mamber/ratnesh.png'
import riteshAgrawal from '../assets/mamber/ritesh agrwal.png'
import sachin from '../assets/mamber/sachin.png'
import sanjay from '../assets/mamber/sanjay.png'
import sunil from '../assets/mamber/sunil.png'
import umesh from '../assets/mamber/umesh.png'
import kiran from '../assets/mamber/kiran.png'
import sangita from '../assets/mamber/sangita.png'
import shital from '../assets/mamber/shital.png'

const color = 'linear-gradient(135deg,#6a1b2a,#d4af37)'

function c({ id, nameHi, nameEn, postHi, postEn, detailHi = '', detailEn = '', photo, initials }) {
  return {
    id,
    name: { hi: nameHi, en: nameEn },
    post: { hi: postHi, en: postEn },
    detail: { hi: detailHi, en: detailEn },
    photo,
    initials,
    color,
  }
}

/** पदाधिकारी — large photos (8) */
export const padadhikari = [
  {
    id: 'pad-1',
    name: { hi: 'श्याम सुंदर गोयल', en: 'Shyam Sundar Goyal' },
    post: { hi: 'अध्यक्ष पद हेतु', en: 'For President' },
    detail: { hi: '(संजय गोयल अनाज मंडी)', en: '(Sanjay Goyal Anaj Mandi)' },
    photo: shyamSunder,
    initials: 'श्सु',
    color,
    experience: {
      hi: 'समाज सेवा में समर्पित नेतृत्व',
      en: 'Dedicated leadership in community service',
    },
    tagline: {
      hi: 'काम किया है — काम करेंगे',
      en: 'Have worked — Will work',
    },
    aboutUs: {
      hi: 'श्याम सुंदर गोयल वर्षों से श्री अग्रवाल समाज की सेवा में सक्रिय हैं। संगठन निर्माण, सदस्यों के कल्याण और पारदर्शी कार्यशैली के प्रति उनकी गहरी प्रतिबद्धता रही है। जय अग्रसेन खाटू श्यामजी पैनल के अध्यक्ष पद प्रत्याशी के रूप में वे समाज को एकजुट व सशक्त बनाने का संकल्प रखते हैं।',
      en: 'Shyam Sundar Goyal has long served Shri Agrawal Samaj. He is committed to organisation building, member welfare and transparent working. As presidential candidate of Jai Agrasen Khatu Shyamji Panel, he aims to unite and strengthen the community.',
    },
    mission: {
      hi: 'एकता, सेवा और विकास — हर सदस्य तक पहुँच, युवाओं को अवसर, और समाज के उज्ज्वल भविष्य के लिए निष्ठापूर्ण नेतृत्व।',
      en: 'Unity, service and development — reach every member, create opportunities for youth, and lead with integrity for a brighter future.',
    },
  },
  c({
    id: 'pad-2',
    nameHi: 'नवीन बागड़ी',
    nameEn: 'Naveen Bagdi',
    postHi: 'महामंत्री पद हेतु',
    postEn: 'For General Secretary',
    photo: navin,
    initials: 'नबा',
  }),
  c({
    id: 'pad-3',
    nameHi: 'राजेश अग्रवाल (इंजीनियर)',
    nameEn: 'Rajesh Agrawal (Engineer)',
    postHi: 'समन्वयक पद हेतु',
    postEn: 'For Coordinator',
    photo: rajesh,
    initials: 'राअ',
  }),
  c({
    id: 'pad-4',
    nameHi: 'प्रयोग गर्ग',
    nameEn: 'Prayog Garg',
    postHi: 'कोषाध्यक्ष पद हेतु',
    postEn: 'For Treasurer',
    photo: prayog,
    initials: 'प्रग',
  }),
  c({
    id: 'pad-5',
    nameHi: 'दिनेश बंसल',
    nameEn: 'Dinesh Bansal',
    postHi: 'उपाध्यक्ष पद हेतु',
    postEn: 'For Vice President',
    photo: dinesh,
    initials: 'दिब',
  }),
  c({
    id: 'pad-6',
    nameHi: 'पिंकी रवि अग्रवाल',
    nameEn: 'Pinki Ravi Agrawal',
    postHi: 'उपाध्यक्ष पद हेतु',
    postEn: 'For Vice President',
    photo: pinki,
    initials: 'पिअ',
  }),
  c({
    id: 'pad-7',
    nameHi: 'अंकित अग्रवाल (काका)',
    nameEn: 'Ankit Agrawal (Kaka)',
    postHi: 'संयुक्त मंत्री पद हेतु',
    postEn: 'For Joint Secretary',
    photo: ankit,
    initials: 'अअ',
  }),
  c({
    id: 'pad-8',
    nameHi: 'रितेश मित्तल',
    nameEn: 'Ritesh Mittal',
    postHi: 'संयुक्त समन्वयक पद हेतु',
    postEn: 'For Joint Coordinator',
    photo: ritesh,
    initials: 'रिम',
  }),
]

/** पुरुष कार्यकारिणी — small photos (10) */
export const purushKaryakarini = [
  c({
    id: 'pur-1',
    nameHi: 'अजय अग्रवाल',
    nameEn: 'Ajay Agrawal',
    postHi: 'पुरुष कार्यकारिणी',
    postEn: 'Male Executive',
    photo: ajay,
    initials: 'अअ',
  }),
  c({
    id: 'pur-2',
    nameHi: 'अमित अग्रवाल',
    nameEn: 'Amit Agrawal',
    postHi: 'पुरुष कार्यकारिणी',
    postEn: 'Male Executive',
    photo: amit,
    initials: 'अम',
  }),
  c({
    id: 'pur-3',
    nameHi: 'जयंत अग्रवाल',
    nameEn: 'Jayant Agrawal',
    postHi: 'पुरुष कार्यकारिणी',
    postEn: 'Male Executive',
    photo: jayant,
    initials: 'जअ',
  }),
  c({
    id: 'pur-4',
    nameHi: 'राजेंद्र अग्रवाल',
    nameEn: 'Rajendra Agrawal',
    postHi: 'पुरुष कार्यकारिणी',
    postEn: 'Male Executive',
    photo: rajendra,
    initials: 'राअ',
  }),
  c({
    id: 'pur-5',
    nameHi: 'रत्नेश गोयल',
    nameEn: 'Ratnesh Goyal',
    postHi: 'पुरुष कार्यकारिणी',
    postEn: 'Male Executive',
    photo: ratnesh,
    initials: 'रगो',
  }),
  c({
    id: 'pur-6',
    nameHi: 'रितेश अग्रवाल',
    nameEn: 'Ritesh Agrawal',
    postHi: 'पुरुष कार्यकारिणी',
    postEn: 'Male Executive',
    photo: riteshAgrawal,
    initials: 'रिअ',
  }),
  c({
    id: 'pur-7',
    nameHi: 'सचिन अग्रवाल',
    nameEn: 'Sachin Agrawal',
    postHi: 'पुरुष कार्यकारिणी',
    postEn: 'Male Executive',
    photo: sachin,
    initials: 'सअ',
  }),
  c({
    id: 'pur-8',
    nameHi: 'संजय बदुका',
    nameEn: 'Sanjay Baduka',
    postHi: 'पुरुष कार्यकारिणी',
    postEn: 'Male Executive',
    photo: sanjay,
    initials: 'सब',
  }),
  c({
    id: 'pur-9',
    nameHi: 'सुनीत गर्ग',
    nameEn: 'Sunit Garg',
    postHi: 'पुरुष कार्यकारिणी',
    postEn: 'Male Executive',
    photo: sunil,
    initials: 'सुग',
  }),
  c({
    id: 'pur-10',
    nameHi: 'उमेश अग्रवाल',
    nameEn: 'Umesh Agrawal',
    postHi: 'पुरुष कार्यकारिणी',
    postEn: 'Male Executive',
    photo: umesh,
    initials: 'उअ',
  }),
]

/** महिला कार्यकारिणी — small photos (3) */
export const mahilaKaryakarini = [
  c({
    id: 'mah-1',
    nameHi: 'किरण गयाप्रसाद टायट',
    nameEn: 'Kiran Gayaprasad Tayat',
    postHi: 'महिला कार्यकारिणी',
    postEn: 'Female Executive',
    photo: kiran,
    initials: 'किट',
  }),
  c({
    id: 'mah-2',
    nameHi: 'संगीता मनोज गुप्ता',
    nameEn: 'Sangeeta Manoj Gupta',
    postHi: 'महिला कार्यकारिणी',
    postEn: 'Female Executive',
    photo: sangita,
    initials: 'संग',
  }),
  c({
    id: 'mah-3',
    nameHi: 'शीतल रवि अग्रवाल',
    nameEn: 'Sheetal Ravi Agrawal',
    postHi: 'महिला कार्यकारिणी',
    postEn: 'Female Executive',
    photo: shital,
    initials: 'शीअ',
  }),
]

export const president = padadhikari[0]

export const candidates = [...padadhikari, ...purushKaryakarini, ...mahilaKaryakarini]

export const panelInfo = {
  org: {
    hi: 'श्री अग्रवाल समाज केन्द्रीय समिति (रजि.), इन्दौर',
    en: 'Shri Agrawal Samaj Kendriya Samiti (Regd.), Indore',
  },
  election: {
    hi: 'द्विवार्षिक चुनाव 2026',
    en: 'Biennial Election 2026',
  },
  panel: {
    hi: 'जय अग्रसेन खाटू श्यामजी पैनल',
    en: 'Jai Agrasen Khatu Shyamji Panel',
  },
  slogan: {
    hi: 'काम किया है — काम करेंगे',
    en: 'Have worked — Will work',
  },
  footer: {
    hi: 'निवेदक — आप और हम',
    en: 'Presented by — You and Us',
  },
  date: {
    hi: '26 जुलाई 2026',
    en: '26 July 2026',
  },
  time: {
    hi: 'प्रातः 10 बजे से सायं 5 बजे तक',
    en: '10 AM to 5 PM',
  },
  venue: {
    hi: 'शुभ कारज गार्डन, राजीव गांधी चौराहा',
    en: 'Shubh Karaj Garden, Rajiv Gandhi Chauraha',
  },
}
