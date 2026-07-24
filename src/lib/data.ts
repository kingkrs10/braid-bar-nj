/**
 * Braid Bar NJ — Live Scraped Data
 * ==============================
 * Catalog of services, add-ons, and products compiled directly from the live scheduling page.
 */

import type { Service, ServiceAddon, Product } from './supabase';

/* =============================================
   Salon Services Catalog (Scraped from Acuity)
   ============================================= */
export const services: Service[] = [
  {
    "id": "srv-71931392",
    "name": "VIP Luxury Braiding Experience [Pre-Washed Kanekalon]",
    "description": "Indulge in a private elevated braiding experience designed for comfort, longevity & high-quality hair.\n\nThis exclusive appointment includes:\n• Private VIP session\n• Luxury shampoo, deep condition, scalp massage & blow-dry\n• Gyal hair\n• Custom color blend (if needed)\n• Signature medium Knotless or Fulani braids\n• Complimentary breakfast and/or lunch (based on service length)\n• Take-home satin bonnet, care guide & product essentials\n\nDuration: 6–8 hours (style dependent)\nStarting at $400 add-o",
    "duration_min": 360,
    "price": 400,
    "deposit_amount": 100,
    "category": "VIP Services",
    "image_url": "https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-89671479",
    "name": "VIP Luxury Braiding Experience [100% Human Hair]",
    "description": "Indulge in a private, elevated braiding experience curated for maximum comfort & flawless results using premium 100% human hair.\n\nYour VIP appointment includes:\n• Private luxury appointment\n• Signature shampoo and deep conditioning treatment\n• Premium 100% human hair\n• Human Hair Knotless\n• Complimentary breakfast and/or lunch (based on service length)\n• Take-home satin bonnet, personalized care guide & product essentials\n\nDuration: 6–10 hours (style dependent)\nInvestment: Starting at $600 add",
    "duration_min": 480,
    "price": 600,
    "deposit_amount": 150,
    "category": "VIP Services",
    "image_url": "https://images.unsplash.com/photo-1629731629152-dd58d8ffc5a7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-18980676",
    "name": "Crochet Box Braids or Twist",
    "description": "Crochet Box Braids or Twist\n\nA low-maintenance, protective style that promotes healthy hair growth while allowing your scalp to breathe.\nPrep Instructions:\nHair must be washed and blow-dried before your appointment unless a shampoo service has been selected.\n\nPlease Note:\nHair is not provided. Please check your local beauty supply store. For more hair options Amazon has a large variety of hair colors and options. \n\nHair is not provided,",
    "duration_min": 90,
    "price": 150,
    "deposit_amount": 38,
    "category": "Crochet",
    "image_url": "https://cdn-s.acuityscheduling.com/appointmentType-18980676.jpeg?1678372330"
  },
  {
    "id": "srv-18980630",
    "name": "Crochet Weave",
    "description": "Crochet Weave\nA low-maintenance, protective style that promotes healthy hair growth while allowing your scalp to breathe.\n\nPrep Instructions:\nHair must be washed and blow-dried before your appointment unless a shampoo service has been selected.\n\nPlease Note:\nHair is not provided. Please check your local beauty supply store. For more hair options Amazon has a large variety of hair colors and options.",
    "duration_min": 150,
    "price": 175,
    "deposit_amount": 44,
    "category": "Crochet",
    "image_url": "https://cdn-s.acuityscheduling.com/appointmentType-18980630.jpeg?1684462316"
  },
  {
    "id": "srv-87927362",
    "name": "Crochet Weave- Human Hair",
    "description": "Human Hair Weave\nA protective style that promotes healthy hair growth while allowing your scalp to breathe.\n\nPrep Instructions:\nHair must be washed and blow-dried before your appointment unless a shampoo service has been selected.\n\nPlease Note:\nHair is not provided. Please check your local beauty supply store. For more hair options Amazon has a large variety of hair colors and options.",
    "duration_min": 180,
    "price": 200,
    "deposit_amount": 50,
    "category": "Crochet",
    "image_url": "https://images.unsplash.com/photo-1629731629152-dd58d8ffc5a7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-13734724",
    "name": "2 Feed-in Braids",
    "description": "Feed-in braids are the perfect style for protecting your natural hair.\n\nPrep Instructions:\nHair must be washed and blow-dried before your appointment unless a shampoo service has been selected.\n\nOptional Additions (must be selected separately):\nExtended length\nCreative braid designs\nSmall braids between feed-in braids\nGoddess\n\nRuwa Hair is available for purchase in salon. Pre-stretched brands are preferred (one pack for 2-4 braids and two packs of hair for 5 or more braids).",
    "duration_min": 60,
    "price": 60,
    "deposit_amount": 25,
    "category": "Feed-Ins",
    "image_url": "https://cdn-s.acuityscheduling.com/appointmentType-13734724.jpeg?1585548331"
  },
  {
    "id": "srv-18971011",
    "name": "4 Feed-in Braids",
    "description": "Feed-in braids are the perfect style for protecting your natural hair.\n\nPrep Instructions:\nHair must be washed and blow-dried before your appointment unless a shampoo service has been selected.\n\nOptional Additions (must be selected separately):\nExtended length\nCreative braid designs\nSmall braids between feed-in braids\nGoddess\n\nRuwa Hair is available for purchase in salon. Pre-stretched brands are preferred (one pack for 2-4 braids and two packs of hair for 5 or more braids).",
    "duration_min": 90,
    "price": 80,
    "deposit_amount": 25,
    "category": "Feed-Ins",
    "image_url": "https://cdn-s.acuityscheduling.com/appointmentType-18971011.jpeg?1728488258"
  },
  {
    "id": "srv-18971010",
    "name": "5 Feed-in Braids",
    "description": "Feed-in braids are the perfect style for protecting your natural hair.\n\nPrep Instructions:\nHair must be washed and blow-dried before your appointment unless a shampoo service has been selected.\n\nOptional Additions (must be selected separately):\nExtended length\nCreative braid designs\nSmall braids between feed-in braids\nGoddess\n\nRuwa Hair is available for purchase in salon. Pre-stretched brands are preferred (one pack for 2-4 braids and two packs of hair for 5 or more braids).",
    "duration_min": 120,
    "price": 95,
    "deposit_amount": 25,
    "category": "Feed-Ins",
    "image_url": "https://cdn-s.acuityscheduling.com/appointmentType-18971010.jpeg?1674709194"
  },
  {
    "id": "srv-18980442",
    "name": "Fulani Knotless Braids {Small}",
    "description": "Small Fulani Braids. Knotless braids in the back and cornrows in the front.\n\n*Style pictured has a “Creative Design”\n\nPrep:\nPlease book your wash \"add-on\" or arrive with your hair washed, blow-dried, and flake-free for the best results.\n\nHair:\nHair is available for purchase, please select color(s) located under “add-on’s”.\nRuwa hair preferred or most pre-stretched brands {3 individual packs}",
    "duration_min": 420,
    "price": 325,
    "deposit_amount": 81,
    "category": "Fulani Braids",
    "image_url": "https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-18980481",
    "name": "Fulani Knotless Braids {Medium}",
    "description": "Medium Fulani Braids.  Knotless braids in the back and cornrows in the front.\n\nPrep:\nPlease book your wash \"add-on\" or arrive with your hair washed, blow-dried, and flake-free for the best results.\n\nHair:\nHair is available for purchase, please select color(s) located under “add-on’s”.\nRuwa hair preferred or most pre-stretched brands {3 individual packs}",
    "duration_min": 360,
    "price": 275,
    "deposit_amount": 69,
    "category": "Fulani Braids",
    "image_url": "https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-18980562",
    "name": "Fulani Knotless Braids {Large}",
    "description": "Large Fulani Braids. Knotless braids in the back and cornrows in the front.\n\nPrep:\nPlease book your wash \"add-on\" or arrive with your hair washed, blow-dried, and flake-free for the best results.\n\nHair:\nHair is available for purchase, please select color(s) located under “add-on’s”.\nRuwa hair preferred or most pre-stretched brands {3 individual packs}\n\nStyle pictured has “Creative Design” add-on.",
    "duration_min": 300,
    "price": 250,
    "deposit_amount": 63,
    "category": "Fulani Braids",
    "image_url": "https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-89761128",
    "name": "Miracle Knots Braids //NEW//",
    "description": "Miracle Knots is a viral crochet hairstyle that offers a quick and easy way to achieve a boho braids look without the long installation time or high cost of traditional methods.\n\nLight weight. Pain free.\n\nRows:\n4 front, 2 back\n\nPrep:\nHair must be washed and blown dry prior to service unless shampoo \"add-on\" was booked. Scalp must be clean + flake free.\n\nHair:\nFeather Human Crochet Hair {3 packs}",
    "duration_min": 240,
    "price": 200,
    "deposit_amount": 50,
    "category": "Human Hair Knotless",
    "image_url": "https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-58772751",
    "name": "100% Human Hair Knotless",
    "description": "Light-weight. Pain free.\n\nKnotless braids are a breath of fresh air, a far cry from traditional box braids. Forgiving on the scalp and safe on your edges. All textures are welcome and work well with this method. \n\nRows:\n5 front, 3 back\n2-3 curls on each braid.\n\nPrep:\nHair can be washed and blown dry prior to service or you can book your wash \"add-on\". \n\nHair: 100% Human hair 3 individual packs. Hair curls or pattern is client preference. Braiding Hair is available for purchase under “add-ons”",
    "duration_min": 390,
    "price": 350,
    "deposit_amount": 88,
    "category": "Human Hair Knotless",
    "image_url": "https://images.unsplash.com/photo-1629731629152-dd58d8ffc5a7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-45859942",
    "name": "VOLUME 100% Human Hair Boho Knotless",
    "description": "Lightweight. Pain free.\n\nKnotless braids are a breath of fresh air, a far cry from traditional box braids. Forgiving on the scalp and safe on your edges. All textures are welcome and work well with this method. \n\nRows:\n6 front, 3 back\n5-6 curls on each braid.\n\nPrep:\nHair can be washed and blown dry prior to service, or you can book your wash \"add-on\". \n\nHair: 100% Human hair ygwigs.com {3 individual packs} body wave or similar brand Depending on the volume of curls you want. Must be 18-24 inches",
    "duration_min": 600,
    "price": 450,
    "deposit_amount": 113,
    "category": "Human Hair Knotless",
    "image_url": "https://images.unsplash.com/photo-1629731629152-dd58d8ffc5a7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-18980266",
    "name": "Kids Knotless Braids",
    "description": "Kids prices are for ages 10 and under.\n\nLight-weight. Pain free.\n\nRows:\n4 front, 2 back\n\nPrep:\nHair can be washed and blown dry prior to service, or you can book your wash \"add-on\". Scalp must be clean + flake free.\n\nHair:\nHair is available for purchase, please select color(s) located under “add-on’s”.\nRuwa hair {2 packs}",
    "duration_min": 240,
    "price": 175,
    "deposit_amount": 44,
    "category": "Kids Styles",
    "image_url": "https://images.unsplash.com/photo-1595642527925-4d41cb781653?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-89661790",
    "name": "Kids Miracle Knots Braids ",
    "description": "Miracle Knots is a viral crochet hairstyle that offers a quick and easy way to achieve a boho braids look without the long installation time or high cost of traditional methods.\n\nKids prices are for ages 10 and under.\n\nLight weight. Pain free.\n\nRows:\n5 front, 3 back\n\nPrep:\nHair must be washed and blown dry prior to service unless shampoo service was booked. Scalp must be clean + flake free.\n\nHair:\nFeather Human Crochet Hair {3 packs}",
    "duration_min": 180,
    "price": 175,
    "deposit_amount": 44,
    "category": "Kids Styles",
    "image_url": "https://images.unsplash.com/photo-1595642527925-4d41cb781653?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-95433490",
    "name": "KIDS Bohohiman Bob Knotless Braids",
    "description": "Kids' (Ages 5–12) \n\nLightweight, pain-free, and gentle on the scalp and edges. This protective style works beautifully on all hair textures. Style includes 5 front rows, 2 back rows, with 3–4 curls added to each braid. \n\nPlease arrive with hair washed and blow-dried or book our Wash & Blow-Dry Add-On. \n\nHair Required: 1 pack of Human Deep Twist or Deep Wave hair (14–16\").",
    "duration_min": 270,
    "price": 200,
    "deposit_amount": 50,
    "category": "Kids Styles",
    "image_url": "https://images.unsplash.com/photo-1629731629152-dd58d8ffc5a7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-18979640",
    "name": "Knotless Braids {Medium}",
    "description": "Light-weight. Pain free.\n\nKnotless braids are a breath of fresh air, a far cry from traditional box braids. Forgiving on the scalp and safe on your edges. All textures are welcome and work well with this method. \n\nKnotless Braids {Medium}:\nNot recommended for short or fine hair textures\nRows:\n5 front, 2 back\nPrep:\nHair can be washed and blown dry prior to service, or you can book your wash \"add-on\". \n\nHair:\nHair is available for purchase.  \nRuwa hair preferred or most pre-stretched brands {3 indi",
    "duration_min": 330,
    "price": 235,
    "deposit_amount": 59,
    "category": "Knotless Braids",
    "image_url": "https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-34334793",
    "name": "Knotless Braids {SMedium)",
    "description": "Light-weight. Pain free.\n\nKnotless braids are a breath of fresh air, a far cry from traditional box braids. Forgiving on the scalp and safe on your edges. All textures are welcome and work well with this method. \n\nRows:\n5 front, 3 back\n\nPrep:\nHair can be washed and blown dry prior to service, or you can book your wash \"add-on\". \n\nHair:\nHair is available for purchase, please select color(s) located under “add-on’s”.\nRuwa hair preferred or most pre-stretched brands {3 individual packs}",
    "duration_min": 420,
    "price": 250,
    "deposit_amount": 63,
    "category": "Knotless Braids",
    "image_url": "https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-18979784",
    "name": "Knotless Braids {Large}",
    "description": "Light-weight. Pain free.\n\nKnotless braids are a breath of fresh air, a far cry from traditional box braids. Forgiving on the scalp and safe on your edges. All textures are welcome and work well with this method. \n\nKnotless Braids {Large}: Not recommended for short or fine hair textures\nRows:\n3 front, 2 back\nPrep:\nHair can be washed and blown dry prior to service, or you can book your wash \"add-on\". \n\nHair:\nHair is available for purchase.\nRuwa hair preferred or most pre-stretched brands.",
    "duration_min": 240,
    "price": 210,
    "deposit_amount": 53,
    "category": "Knotless Braids",
    "image_url": "https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-77875239",
    "name": "Starter Locs ",
    "description": "Get your locs started today!\n\nComb coil locs with box or free parts. Low maintenance. The duration of the starter loc phase can vary depending on hair type, texture, and individual growth rate, potentially lasting a few weeks to several months. The duration of the starter loc phase can vary depending on hair type, texture, and individual growth rate, potentially lasting four weeks.\n\n“Starter locs” this option should be selected until locs begin to fuse together.",
    "duration_min": 180,
    "price": 150,
    "deposit_amount": 38,
    "category": "Locs",
    "image_url": "https://images.unsplash.com/photo-1629731629152-dd58d8ffc5a7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-56119890",
    "name": "Microlocs Installation",
    "description": "Start your micro loc journey today. Please book a consultation BEFORE booking this service. Clients' hair density will determine if you are a good candidate for this hairstyle. This style can take 18 to 24 hours so it will be broken out into two sessions.\n\nPrice does vary depending on hair length. It’s $100 extra per inch.",
    "duration_min": 720,
    "price": 600,
    "deposit_amount": 150,
    "category": "Locs",
    "image_url": "https://images.unsplash.com/photo-1629731629152-dd58d8ffc5a7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-93421236",
    "name": "Weave Refresh ",
    "description": "A style refresh with track tightening and shampoo included.",
    "duration_min": 90,
    "price": 75,
    "deposit_amount": 25,
    "category": "Maintenance",
    "image_url": "https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-77135785",
    "name": "Loc Retwist",
    "description": "Loc retwist which includes shampoo and twist. No style.",
    "duration_min": 120,
    "price": 95,
    "deposit_amount": 25,
    "category": "Maintenance",
    "image_url": "https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-88826766",
    "name": "Starter Locs Retwist",
    "description": "Get your locs started today!\n\nComb coil locs with box or free parts. Low maintenance. The duration of the starter loc phase can vary depending on hair type, texture, and individual growth rate, potentially lasting a few weeks to several months. The duration of the starter loc phase can vary depending on hair type, texture, and individual growth rate, potentially lasting four weeks.\n\n“Starter locs” this option should be selected until locs begin to fuse together.",
    "duration_min": 180,
    "price": 125,
    "deposit_amount": 31,
    "category": "Maintenance",
    "image_url": "https://images.unsplash.com/photo-1629731629152-dd58d8ffc5a7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-27689723",
    "name": "Cornrows with Creative Design",
    "description": "No hair added. Creative design (cris cross, zig zag).\n\nPrep:\nPlease come with hair washed and blown dry, or you can book your wash \"add-on\". A clean and flake free scalp produces best results.",
    "duration_min": 120,
    "price": 120,
    "deposit_amount": 30,
    "category": "Men's Styles",
    "image_url": "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-19488140",
    "name": "Cornrows {No Hair Added}",
    "description": "Simple cornrow protective style with no hair added.\n\nA additional fee may be added for designs or small braids.\n\nPrep:\nPlease come with hair washed and blown dry, or you can book your wash \"add-on\". A clean and flake free scalp produces best results.",
    "duration_min": 90,
    "price": 90,
    "deposit_amount": 25,
    "category": "Men's Styles",
    "image_url": "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-76141761",
    "name": "4 Cornrow Style No hair added",
    "description": "Protective style with no hair added.\n\nAn additional fee may be added for designs or small braids.\n\nPrep:\nPlease come with hair washed and blown dry, or you can book your wash \"add-on\". A clean and flake free scalp produces best results.",
    "duration_min": 60,
    "price": 55,
    "deposit_amount": 25,
    "category": "Men's Styles",
    "image_url": "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-60672655",
    "name": "Full Sew-in Weave (new)",
    "description": "Sew-in Weave. Crown of your natural hair is left out to give the most natural look and feel. Wear it up or down. Currently only providing curly weaves. No straighten services available at this time.  \n\nPrep:\nHair can be washed and blown dry prior to service, or you can book your washed \"add-on\". Scalp must be clean + flake free.\n\nHair: 100% Human Hair 2 bundles of hair. Curls or pattern is client preference.",
    "duration_min": 180,
    "price": 225,
    "deposit_amount": 56,
    "category": "WEAVE",
    "image_url": "https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-53045875",
    "name": "Sew in Half up and Down",
    "description": "Half up Sew-in Weave. Front half choose from a bun or ponytail with a sew in weave in the back. Currently only providing curly weaves. No straighten services available at this time.  \n\nPrep:\nHair can be washed and blown dry prior to service, or you can book your wash \"add-on\". Scalp must be clean + flake free.\n\nHair: 100% Human Hair 2 bundles of hair. Curls or pattern is client preference.",
    "duration_min": 150,
    "price": 200,
    "deposit_amount": 50,
    "category": "WEAVE",
    "image_url": "https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-18981490",
    "name": "Large Knotless",
    "description": "Light-weight. Pain free.\n\nKnotless braids are a breath of fresh air, a far cry from traditional box braids. Forgiving on the scalp and safe on your edges. All textures are welcome and work well with this method. \n\nKnotless Braids {jumbo]:\nNot recommended for short or fine hair textures\nRows:\n4 front, 2 back\nPrep:\nHair must be washed and blown dry prior to service. Scalp must be clean + flake free.\n\nHair:\nHair is available for purchase.\nRuwa hair preferred or most pre-stretched brands.",
    "duration_min": 240,
    "price": 175,
    "deposit_amount": 44,
    "category": "STYLIST// Abby Charles",
    "image_url": "https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-18981513",
    "name": "Jumbo Knotless",
    "description": "Light-weight. Pain free.\n\nKnotless braids are a breath of fresh air, a far cry from traditional box braids. Forgiving on the scalp and safe on your edges. All textures are welcome and work well with this method. \n\nKnotless Braids {jumbo]:\nNot recommended for short or fine hair textures\nRows:\n4 front, 2 back\nPrep:\nHair must be washed and blown dry prior to service. Scalp must be clean + flake free.\n\nHair:\nHair is available for purchase.\nRuwa hair preferred or most pre-stretched brands.",
    "duration_min": 200,
    "price": 150,
    "deposit_amount": 38,
    "category": "STYLIST// Abby Charles",
    "image_url": "https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-48768119",
    "name": "Kids Knotless",
    "description": "Light-weight. Pain free.\n\nKnotless braids are a breath of fresh air, a far cry from traditional box braids. Forgiving on the scalp and safe on your edges. All textures are welcome and work well with this method. \n\nKnotless Braids {jumbo]:\nNot recommended for short or fine hair textures\nRows:\n3 front, 1 back\nPrep:\nHair must be washed and blown dry prior to service. Scalp must be clean + flake free.\n\nHair:\nHair is available for purchase.\nRuwa hair preferred or most pre-stretched brands",
    "duration_min": 240,
    "price": 150,
    "deposit_amount": 38,
    "category": "STYLIST// Abby Charles",
    "image_url": "https://images.unsplash.com/photo-1595642527925-4d41cb781653?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-64741717",
    "name": "Shampoo + Blow dry + Braid Takedown (Large)",
    "description": "Shampoo, deep conditioning, steam treatment, and blow dry. Clients' natural hair will be put into 2 simple cornrows.",
    "duration_min": 120,
    "price": 125,
    "deposit_amount": 31,
    "category": "Takedown",
    "image_url": "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-95268253",
    "name": "Shampoo + Blow dry + Crochet/Sew-in Weave ",
    "description": "Shampoo, deep conditioning, steam treatment, and blow dry. Clients' natural hair will be put into 2 simple cornrows.",
    "duration_min": 120,
    "price": 100,
    "deposit_amount": 25,
    "category": "Takedown",
    "image_url": "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-67693407",
    "name": "Shampoo + Blow dry + Braid Takedown (Medium)",
    "description": "Shampoo, deep conditioning, steam treatment, and blow dry. Clients' natural hair will be put into 2 simple cornrows.",
    "duration_min": 180,
    "price": 150,
    "deposit_amount": 38,
    "category": "Takedown",
    "image_url": "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-70302152",
    "name": "Mini Twist w/Natural hair",
    "description": "Mini Twist with your natural hair and no hair added. Starts at $150 depending on length Done with small parts 3 rows in the back and 6 rows on each side in the front. A consultation is suggested before this style is rendered. Light weight. Tension free style. A good alternative to braids. Versatile protective style.\nPrep:\nHair must be washed and blown dry prior to service. Scalp must be clean + flake free. you can also select a Shampoo Service.",
    "duration_min": 180,
    "price": 150,
    "deposit_amount": 38,
    "category": "Twist Styles",
    "image_url": "https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-56117036",
    "name": "Small Knotless Twist",
    "description": "A simple, lightweight, protective style, perfect for the summer time, or anytime. \n\nHair Prep:\nHair can be washed and blown dry prior to appointment, or you can book your wash \"add-on\". A clean, flake free scalp produces best results. \n\nHair Recommended:\nQVR Afro Kinky Bulk \nhttps://qvr.com/products/qvr-natural-black-afro-kinky-bulk-hair-extensions-for-braiding-dreadlock-human-hair\n4 packs\n*Hair Not provided*",
    "duration_min": 480,
    "price": 350,
    "deposit_amount": 88,
    "category": "Twist Styles",
    "image_url": "https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-18980208",
    "name": "Spring || Passion Twist {shoulder - mid-back}",
    "description": "Passion Twist are Light-weight. Tension free style. A good alternative to braids. Versatile protective style.\n\nPrep:\nHair can be washed and blown dry prior to service, or you can book your wash \"add-on\". Scalp must be clean + flake free.\n\nHair:\nWe do not provide hair.\nSpring Twist hair [3 packs] -OR-\nPassion Twist- Lulutress Water wave [6 packs]",
    "duration_min": 300,
    "price": 225,
    "deposit_amount": 56,
    "category": "Twist Styles",
    "image_url": "https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-90423263",
    "name": "Double Bun",
    "description": "Keep it Sleek and Simple with this style!\n\nThis style is two buns with one under the crown of the head and one on your nape.\n\n//PRICE// varies depending on style $65 is a starting price. \n\nPrep:\nHair can be washed and blown dry prior to service, or you can book your wash \"add-on\". Scalp must be clean.\n\n(Salon does not provide hair for this style)\nRuwa hair {1 pack} for this style\nAdded an addition? Please bring a additional pack.",
    "duration_min": 30,
    "price": 100,
    "deposit_amount": 25,
    "category": "Updo's + Ponytails + Simple Styles",
    "image_url": "https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-18980857",
    "name": "Butterfly Braids",
    "description": "Butterfly Braids.\n2 feed-in braids with curls added to the ends.\n\nPrep:\nHair can be washed and blown dry prior to service, or you can book your wash \"add-on\". Scalp must be clean + flake free.\n\nPrice:\n\nHair:\nHair is available for purchase, please select color(s) located under “add-on’s”.\nRuwa hair preferred or most pre-stretched brands {1 individual pack} \n2-packs of sewn in hair. Any brand of your choice as long as the hair is on a track.",
    "duration_min": 90,
    "price": 90,
    "deposit_amount": 25,
    "category": "Updo's + Ponytails + Simple Styles",
    "image_url": "https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-22052275",
    "name": "The Swirl or Bun",
    "description": "Keep it Sleek and Simple with this style!\n\nThis style is one bun that can be on you nape (as pictured) or a cute top knot!\n\nDouble up on this fun style. Make it two buns instead of one click “add on”.\n\n//PRICE// varies depending on style $65 is a starting price. \n\nPrep:\nHair can be washed and blown dry prior to service, or you can book your wash \"add-on\". Scalp must be clean.\n\n(Salon does not provide hair for this style)\nRuwa hair {1 pack} for one bun\nAdded a addition? Please bring a additional pack.",
    "duration_min": 60,
    "price": 80,
    "deposit_amount": 25,
    "category": "Updo's + Ponytails + Simple Styles",
    "image_url": "https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "srv-20963621",
    "name": "Consultation",
    "description": "Book your in-person consultation today! Short hair? Long hair? Do you have questions or concerns regarding a service? \n\nRecommended for Microloc services. $50 will be deducted from your final service once you book your appointment.\n\nPlease book a consultation prior to booking an appointment. The $50 fee will be deducted from your service once you book.",
    "duration_min": 30,
    "price": 50,
    "deposit_amount": 25,
    "category": "Welcome",
    "image_url": "https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80"
  }
];

/* =============================================
   Service Add-ons Catalog (Scraped from Acuity)
   ============================================= */
export const addons: ServiceAddon[] = [
  {
    "id": "add-1466815",
    "name": "Added Cornrows {between large cornrows}",
    "price": 25,
    "duration_min": 60
  },
  {
    "id": "add-7090362",
    "name": "Added Row (Medium Knotless)",
    "price": 20,
    "duration_min": 30
  },
  {
    "id": "add-7004146",
    "name": "Added Tracks ",
    "price": 10,
    "duration_min": 15
  },
  {
    "id": "add-1646881",
    "name": "Bohemian (small) synthetic",
    "price": 80,
    "duration_min": 175
  },
  {
    "id": "add-6113544",
    "name": "Bohemian [Maintenance]",
    "price": 25,
    "duration_min": 30
  },
  {
    "id": "add-2076874",
    "name": "Bohemian {Jumbo} synthetic",
    "price": 40,
    "duration_min": 30
  },
  {
    "id": "add-2076871",
    "name": "Bohemian {large} synthetic",
    "price": 50,
    "duration_min": 45
  },
  {
    "id": "add-2076864",
    "name": "Bohemian {medium} synthetic",
    "price": 60,
    "duration_min": 90
  },
  {
    "id": "add-3219725",
    "name": "Bohemian {smedium} synthetic",
    "price": 70,
    "duration_min": 70
  },
  {
    "id": "add-1739130",
    "name": "Bun or Braid ",
    "price": 15,
    "duration_min": 25
  }
];

/* =============================================
   Featured Products Catalog
   ============================================= */
export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Silk Edge Wrap & Control',
    description: 'Keep your edges sleek and flat with our signature silk wrap bands paired with a 24h extreme-hold edge control gel.',
    price: 22,
    category: 'accessories',
    sizes: ['One Size'],
    colors: ['Champagne Gold', 'Espresso Black'],
    images: ['https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=600&q=80'],
    in_stock: true,
  },
  {
    id: 'prod-002',
    name: 'Premium Braiding Hair (Multipack)',
    description: 'Pre-stretched, anti-itch braiding hair in natural shades. Standard fiber selected for clean, frizz-free braids.',
    price: 18,
    category: 'accessories',
    sizes: ['24 inch', '30 inch'],
    colors: ['1B Natural Black', '4 Chocolate Brown', '27 Honey Blonde'],
    images: ['https://images.unsplash.com/photo-1605497746445-97d1b0a9e94e?auto=format&fit=crop&w=600&q=80'],
    in_stock: true,
  },
];

/* =============================================
   Salon Info & About (West Orange, NJ)
   ============================================= */
export const salonInfo = {
  title: 'The Braid Bar NJ',
  tagline: 'Knot just braids, it\'s a vibe.',
  description: 'An upscale, modern braiding salon located in the valley district of West Orange, New Jersey. Founded by self-taught braider Sharon French with over 20 years of experience, we specialize in high-quality protective styling, custom color blending, and private VIP luxury experiences.',
  hours: {
    weekdays: '10:00 AM — 6:00 PM',
    saturday: '9:00 AM — 3:00 PM',
    sunday: 'Closed',
  },
  contact: {
    email: 'braidbar1nj@gmail.com',
    phone: '551-339-3637',
    address: '558 Valley Road, West Orange, NJ 07052',
  },
  team: [
    {
      name: 'Sharon French',
      role: 'Founder & Lead Stylist',
      bio: 'A self-taught braider with over 20 years of experience. Founder and lead stylist of the Braid Bar NJ, a premium protective styling sanctuary located in the valley district of West Orange, New Jersey.'
    },
    {
      name: 'Abigail Charles',
      role: 'Salon Assistant & Stylist',
      bio: 'Abigail is the newest member of the Braid Bar team, bringing positive energy and a passion for natural hair care. She supports stylists with client prep, shampooing, and braid takedowns while developing protective styling skills.'
    }
  ]
};

export const werkspaceInfo = {
  title: 'The WerkSpace',
  tagline: 'Where boss moves are made.',
  description: 'Creative co-working spaces designed for women entrepreneurs and creatives, offering flexible workspace options, content creation zones, and masterclasses.',
  features: [
    'High-speed WiFi & charging hubs',
    'Private content creation area',
    'Complimentary coffee & tea bar',
    'Access to local styling classes',
  ],
  hours: {
    weekdays: '9:00 AM — 6:00 PM',
    saturday: '10:00 AM — 4:00 PM',
    sunday: 'Closed',
  },
  contact: {
    email: 'braidbar1nj@gmail.com',
    phone: '551-339-3637',
    address: '558 Valley Road, West Orange, NJ 07052',
  },
};
