import { useState, useRef } from "react";

// ─── 10 TEST SETS × 18 QUESTIONS — ALL ORIGINAL, ALL UNITS COVERED ──────────
const SETS = [
  {
    id:1, title:"Test Set 1", sub:"Mix A · All Units",
    icon:"🚀", g:["#FF6B6B","#EE0979"],
    qs:[
      {s:"3.OA.A.1",q:"A baker puts 6 muffins in each box and fills 7 boxes. Which equation shows the total muffins?",o:["6+7=13","6×7=42","7−6=1","42÷6=7"],a:"6×7=42",e:"Multiplication means equal groups. 6 muffins × 7 boxes = 42 muffins total."},
      {s:"3.OA.A.2",q:"A teacher has 36 crayons and shares them equally among 4 tables. How many crayons per table?",o:["4","6","8","9"],a:"9",e:"36 ÷ 4 = 9. Check: 4 × 9 = 36 ✓"},
      {s:"3.OA.A.3",q:"A store has 5 shelves with 8 books each. A delivery adds 10 more. How many books total?",o:["40","50","18","43"],a:"50",e:"5 × 8 = 40 books on shelves, then 40 + 10 = 50."},
      {s:"3.OA.A.4",q:"What number makes this true?  □ × 9 = 72",o:["7","8","9","6"],a:"8",e:"8 × 9 = 72. Count by 9s eight times to confirm."},
      {s:"3.OA.B.5",q:"If 7 × 4 = 28 is known, which other fact is automatically known using the commutative property?",o:["4×7=28","28÷7=4","7+4=11","28−7=21"],a:"4×7=28",e:"Commutative property: a × b = b × a. So 7×4 = 4×7 = 28."},
      {s:"3.OA.B.6",q:"Marcus uses a related multiplication fact to solve 54 ÷ 6. Which fact helps?",o:["6×7=42","6×9=54","6×8=48","6×6=36"],a:"6×9=54",e:"Division as unknown factor: 6 × ? = 54. Since 6 × 9 = 54, the answer is 9."},
      {s:"3.OA.C.7",q:"What is 8 × 7?",o:["54","56","48","63"],a:"56",e:"8 × 7 = 56. A multiplication fact to know from memory by end of Grade 3."},
      {s:"3.OA.D.9",q:"Every multiple of 5 in a multiplication table ends in which digits?",o:["1 or 3","0 or 5","2 or 4","6 or 8"],a:"0 or 5",e:"Multiples of 5 always end in 0 or 5: 5, 10, 15, 20, 25 ..."},
      {s:"3.NBT.A.1",q:"Round 648 to the nearest ten.",o:["600","640","650","700"],a:"650",e:"Ones digit is 8 ≥ 5, so round up the tens: 640 → 650."},
      {s:"3.NBT.A.2",q:"A library has 423 fiction and 358 non-fiction books. How many books total?",o:["771","781","761","681"],a:"781",e:"423 + 358: 3+8=11 (carry 1), 2+5+1=8, 4+3=7 → 781."},
      {s:"3.NBT.A.3",q:"What is 7 × 60?",o:["42","420","4,200","67"],a:"420",e:"7 × 6 = 42, then × 10 = 420. Place value strategy."},
      {s:"3.MD.A.1",q:"Swim practice starts at 9:20 a.m. and lasts 50 minutes. What time does it end?",o:["9:50 a.m.","10:00 a.m.","10:10 a.m.","10:20 a.m."],a:"10:10 a.m.",e:"9:20 + 40 min = 10:00, then + 10 more = 10:10 a.m."},
      {s:"3.MD.C.5",q:"Which best describes area?",o:["Distance around a shape","Unit squares covering a shape","Length of one side","Weight of a shape"],a:"Unit squares covering a shape",e:"Area = the number of unit squares that cover a flat shape without gaps or overlaps."},
      {s:"3.MD.C.7",q:"A rectangular garden is 9 ft long and 4 ft wide. What is its area?",o:["13 sq ft","26 sq ft","36 sq ft","40 sq ft"],a:"36 sq ft",e:"Area = length × width = 9 × 4 = 36 sq ft."},
      {s:"3.MD.D.8",q:"A square has a perimeter of 28 cm. How long is each side?",o:["4 cm","7 cm","14 cm","56 cm"],a:"7 cm",e:"Square has 4 equal sides. 28 ÷ 4 = 7 cm per side."},
      {s:"3.NF.A.1",q:"A chocolate bar has 8 equal pieces. Dara eats 3. What fraction did she eat?",o:["3/11","8/3","3/8","5/8"],a:"3/8",e:"3 pieces out of 8 equal pieces = 3/8."},
      {s:"3.NF.A.3",q:"Which fraction is equivalent to 1/2?",o:["2/6","3/4","2/4","3/8"],a:"2/4",e:"1/2 = 2/4. Two out of four equal parts is the same as one out of two."},
      {s:"3.G.A.1",q:"Which shape has exactly 4 sides and 4 right angles?",o:["Rhombus","Trapezoid","Rectangle","Pentagon"],a:"Rectangle",e:"A rectangle has 4 sides and 4 right (90°) angles. It is a quadrilateral."},
    ]
  },
  {
    id:2, title:"Test Set 2", sub:"Mix B · All Units",
    icon:"⭐", g:["#4ECDC4","#0575E6"],
    qs:[
      {s:"3.OA.A.1",q:"Which context represents 3 × 5?",o:["3 children share 5 items","5 bags with 3 apples each","3 apples taken from 5","5 more than 3"],a:"5 bags with 3 apples each",e:"3 × 5 = 5 groups of 3. 5 bags × 3 apples = 15 apples."},
      {s:"3.OA.A.2",q:"A farmer packs 48 eggs into cartons of 6. How many cartons?",o:["6","7","8","9"],a:"8",e:"48 ÷ 6 = 8. Check: 8 × 6 = 48 ✓"},
      {s:"3.OA.A.3",q:"Tickets cost $4. Mrs. Ruiz buys 7 tickets. How much does she spend?",o:["$11","$21","$28","$47"],a:"$28",e:"7 × $4 = $28 total."},
      {s:"3.OA.A.4",q:"Which value makes both true?  48 ÷ □ = 6  and  □ × 6 = 48",o:["6","7","8","9"],a:"8",e:"48 ÷ 8 = 6 and 8 × 6 = 48. Multiplication and division are inverses."},
      {s:"3.OA.B.5",q:"A student solves 4×3×5 by computing 3×5=15, then 4×15=60. Which property?",o:["Commutative","Distributive","Associative","Identity"],a:"Associative",e:"Associative property: (4×3)×5 = 4×(3×5). Regrouping factors gives the same product."},
      {s:"3.OA.B.6",q:"Solve 63 ÷ 7 using a related multiplication fact.",o:["7","8","9","6"],a:"9",e:"7 × 9 = 63, so 63 ÷ 7 = 9."},
      {s:"3.OA.D.8",q:"Mia has 3 bags with 9 grapes each, then eats 7. Which expression gives grapes left?",o:["3+9−7","(3×9)−7","3×(9−7)","9÷3+7"],a:"(3×9)−7",e:"Total = 3×9=27, then subtract: 27−7=20 grapes left."},
      {s:"3.OA.D.9",q:"All products in the ×2 row of a multiplication table are even. Why?",o:["2 is a small number","Doubling always gives an even result","2+2=4","They skip-count by 3"],a:"Doubling always gives an even result",e:"2 × any whole number doubles it, creating pairs — always an even result."},
      {s:"3.NBT.A.1",q:"What is 273 rounded to the nearest hundred?",o:["200","270","280","300"],a:"300",e:"Tens digit of 273 is 7 ≥ 5. Round up: 200 → 300."},
      {s:"3.NBT.A.2",q:"Road crew repaired 507 potholes in June and 348 in July. Total potholes?",o:["845","855","865","875"],a:"855",e:"507 + 348: 7+8=15 (carry 1), 0+4+1=5, 5+3=8 → 855."},
      {s:"3.NBT.A.3",q:"A box holds 8 oranges. There are 40 boxes. How many oranges?",o:["32","48","320","3,200"],a:"320",e:"8 × 40 = 8 × 4 × 10 = 32 × 10 = 320."},
      {s:"3.MD.A.1",q:"Nora starts reading at 6:47 p.m. and reads 25 minutes. When does she stop?",o:["7:02 p.m.","7:07 p.m.","7:12 p.m.","7:17 p.m."],a:"7:12 p.m.",e:"6:47 + 13 min = 7:00, then + 12 more = 7:12 p.m."},
      {s:"3.MD.C.6",q:"A figure has 5 rows of 6 unit squares each. What is the area?",o:["11 sq units","22 sq units","30 sq units","56 sq units"],a:"30 sq units",e:"5 × 6 = 30 unit squares = 30 sq units of area."},
      {s:"3.MD.C.7",q:"Using the distributive property, a 6 ft × (7+3) ft rectangle splits into two. What is the total area?",o:["60 sq ft","16 sq ft","42 sq ft","30 sq ft"],a:"60 sq ft",e:"6×(7+3) = (6×7)+(6×3) = 42+18 = 60 sq ft."},
      {s:"3.MD.D.8",q:"A rectangular playground is 15 m long and 8 m wide. What is its perimeter?",o:["23 m","46 m","120 m","56 m"],a:"46 m",e:"P = 2×(15+8) = 2×23 = 46 m."},
      {s:"3.NF.A.2",q:"A number line from 0 to 1 has 4 equal parts. Which label is halfway between 0 and 1?",o:["1/4","2/4","3/4","4/4"],a:"2/4",e:"Halfway = 2 of 4 equal parts = 2/4 (same as 1/2)."},
      {s:"3.NF.A.3",q:"Lena says 3/3 = 1 whole. Correct?",o:["No, 3/3 = 0","No, 3/3 = 3","Yes, all 3 parts of 3 equal parts = the whole","Yes but only for circles"],a:"Yes, all 3 parts of 3 equal parts = the whole",e:"Numerator = denominator means the fraction = 1 whole. 3/3 = 1."},
      {s:"3.G.A.2",q:"A rectangle is partitioned into 6 equal parts. What fraction is each part?",o:["6/1","1/3","1/6","2/3"],a:"1/6",e:"Each of 6 equal parts of a whole = 1/6."},
    ]
  },
  {
    id:3, title:"Test Set 3", sub:"Mix C · All Units",
    icon:"🌟", g:["#A855F7","#EC4899"],
    qs:[
      {s:"3.OA.A.1",q:"Which context could be represented by 4 × 9?",o:["4 children share 9 stickers","9 bags with 4 buttons each","4 more than 9","9 taken from 4"],a:"9 bags with 4 buttons each",e:"4 × 9 = 9 groups of 4. 9 bags × 4 buttons = 36 buttons."},
      {s:"3.OA.A.2",q:"A librarian sorts 45 books equally onto 5 shelves. Books per shelf?",o:["5","8","9","40"],a:"9",e:"45 ÷ 5 = 9. Check: 5 × 9 = 45 ✓"},
      {s:"3.OA.B.5",q:"Which shows the distributive property to find 6 × 8?",o:["6×8 = 8×6","6×8 = 6×(5+3) = 30+18 = 48","6×8 = (6×4)×2","6×8 = 6×6+2"],a:"6×8 = 6×(5+3) = 30+18 = 48",e:"Distributive: a×(b+c) = a×b + a×c. 6×(5+3) = 30+18 = 48."},
      {s:"3.OA.C.7",q:"What is 6 × 6?",o:["30","36","42","48"],a:"36",e:"6 × 6 = 36. A product of two one-digit numbers to know from memory."},
      {s:"3.OA.D.8",q:"A zoo has 4 cages with 6 animals each. Then 5 animals moved away. Animals remaining?",o:["a=4+6−5=5","a=(4×6)−5=19","a=4×6×5=120","a=6÷4+5"],a:"a=(4×6)−5=19",e:"Total = 4×6=24. Subtract moved: 24−5=19 remain."},
      {s:"3.NBT.A.1",q:"A number is less than 350 and rounds to 350 to the nearest ten. Which could it be?",o:["340","345","351","355"],a:"345",e:"345 has ones digit 5 ≥ 5, so it rounds up to 350. And 345 < 350 ✓"},
      {s:"3.NBT.A.2",q:"732 fans at a game; 195 left at halftime. How many remain?",o:["537","547","637","927"],a:"537",e:"732 − 195 = 537. Regroup carefully across hundreds, tens, and ones."},
      {s:"3.NBT.A.3",q:"A stadium has 9 sections of 50 seats each. Total seats?",o:["59","450","4,500","500"],a:"450",e:"9 × 50 = 9 × 5 × 10 = 45 × 10 = 450."},
      {s:"3.MD.A.1",q:"Diego left at 7:55 a.m. and arrived at school at 8:23 a.m. How long was his trip?",o:["18 min","28 min","33 min","45 min"],a:"28 min",e:"7:55 to 8:00 = 5 min. 8:00 to 8:23 = 23 min. Total = 28 min."},
      {s:"3.MD.A.2",q:"A melon weighs 3 kg. A pineapple weighs 900 g. How much heavier is the melon? (1 kg = 1,000 g)",o:["897 g","2,100 g","300 g","3,900 g"],a:"2,100 g",e:"3 kg = 3,000 g. 3,000 − 900 = 2,100 g heavier."},
      {s:"3.MD.C.7",q:"A rectangle has area 56 sq cm and one side 7 cm. What is the other side?",o:["6 cm","7 cm","8 cm","9 cm"],a:"8 cm",e:"Area = l × w. 56 = 7 × w. w = 56 ÷ 7 = 8 cm."},
      {s:"3.MD.C.7",q:"A rectilinear figure is made of a 5m×3m and a 4m×2m rectangle. Total area?",o:["14 sq m","23 sq m","28 sq m","30 sq m"],a:"23 sq m",e:"5×3=15 and 4×2=8. Total = 15+8 = 23 sq m."},
      {s:"3.MD.D.8",q:"Two rectangles share perimeter 20 cm. One is 6×4. Which other has the same perimeter?",o:["7×3","5×5","4×2","Both 7×3 and 5×5"],a:"Both 7×3 and 5×5",e:"7+3=10, 2×10=20 ✓. 5+5=10, 2×10=20 ✓. Both share perimeter 20 cm."},
      {s:"3.NF.A.1",q:"A rope is cut into 8 equal sections. You use 5 sections. What fraction did you use?",o:["5/13","3/8","5/8","8/5"],a:"5/8",e:"5 sections of 8 equal sections = 5/8 of the rope."},
      {s:"3.NF.A.2",q:"On a 0-to-1 number line with 6 equal parts, where is 5/6?",o:["Past 3/4 of the way","Before halfway","At exactly 1/2","At the very start"],a:"Past 3/4 of the way",e:"5/6 ≈ 0.833, which is between 3/4 = 0.75 and 1. It is past the 3/4 mark."},
      {s:"3.NF.A.3",q:"Compare: 2/3 ☐ 2/4. Which symbol is correct?",o:["> (greater than)","< (less than)","= (equal to)","Cannot compare"],a:"> (greater than)",e:"Same numerator (2). Thirds are bigger pieces than fourths. So 2/3 > 2/4."},
      {s:"3.G.A.1",q:"What attribute do a rhombus and a rectangle share?",o:["Both have 4 right angles","Both have 4 equal sides","Both have exactly 4 sides","Both are circles"],a:"Both have exactly 4 sides",e:"Both rhombus and rectangle are quadrilaterals — shapes with exactly 4 sides."},
      {s:"3.MD.B.3",q:"Bar graph: Soccer=20, Basketball=15, Baseball=10, Swimming=25. How many more swim than play basketball?",o:["5","10","15","40"],a:"10",e:"Swimming=25, Basketball=15. 25−15=10 more swimmers."},
    ]
  },
  {
    id:4, title:"Test Set 4", sub:"Mix D · All Units",
    icon:"🏆", g:["#F7971E","#FFD200"],
    qs:[
      {s:"3.OA.A.3",q:"Volunteers plant 8 trees per row and make 7 rows. Trees planted in all?",o:["15","48","56","64"],a:"56",e:"8 × 7 = 56 trees. Equal groups situation."},
      {s:"3.OA.A.4",q:"What value completes:  5 = 45 ÷ □",o:["5","7","8","9"],a:"9",e:"45 ÷ 9 = 5. Check: 5 × 9 = 45 ✓"},
      {s:"3.OA.B.5",q:"A student finds 8×7 by thinking (8×5)+(8×2). Which property?",o:["Commutative","Associative","Distributive","Identity"],a:"Distributive",e:"Distributive: 8×(5+2) = (8×5)+(8×2) = 40+16 = 56."},
      {s:"3.OA.C.7",q:"What is 9 × 6?",o:["45","54","56","63"],a:"54",e:"9 × 6 = 54. Count by 9s six times to verify."},
      {s:"3.OA.D.8",q:"A box holds 6 rows of 8 eggs. There are 3 boxes. Total eggs?",o:["e=6+8+3","e=(6×8)×3","e=6×8+3","e=(6+8)×3"],a:"e=(6×8)×3",e:"Each box: 6×8=48. Three boxes: 48×3=144. So e=(6×8)×3."},
      {s:"3.OA.D.9",q:"What pattern appears when adding 0 to any number in an addition table?",o:["Sum doubles","Sum is always 0","Sum equals the original number","Sum is always 1"],a:"Sum equals the original number",e:"Identity property: n + 0 = n. Adding zero never changes the value."},
      {s:"3.NBT.A.1",q:"Round 555 to the nearest ten AND nearest hundred.",o:["560 and 500","550 and 500","560 and 600","550 and 600"],a:"560 and 600",e:"Nearest ten: ones=5≥5 → 560. Nearest hundred: tens=5≥5 → 600."},
      {s:"3.NBT.A.2",q:"A store sold 613 toys in May and 247 in June. How many fewer in June?",o:["356","366","376","866"],a:"366",e:"613 − 247 = 366. Regroup as needed."},
      {s:"3.NBT.A.3",q:"40 classrooms each have 30 desks. Total desks?",o:["120","700","1,200","70"],a:"1,200",e:"40 × 30 = 4 × 3 × 100 = 12 × 100 = 1,200."},
      {s:"3.MD.A.1",q:"A dentist appointment starts at 3:38 p.m. and takes 40 minutes. End time?",o:["4:08 p.m.","4:18 p.m.","4:28 p.m.","3:78 p.m."],a:"4:18 p.m.",e:"3:38 + 22 min = 4:00, then + 18 more = 4:18 p.m."},
      {s:"3.MD.A.2",q:"A jug has 3 liters. Students drink 1,200 mL. How many mL remain? (1 L=1,000 mL)",o:["1,200 mL","1,800 mL","2,800 mL","4,200 mL"],a:"1,800 mL",e:"3 L = 3,000 mL. 3,000 − 1,200 = 1,800 mL."},
      {s:"3.MD.C.6",q:"A tiled floor has 9 rows of 8 tiles, each 1 sq ft. What is the area?",o:["17 sq ft","36 sq ft","56 sq ft","72 sq ft"],a:"72 sq ft",e:"9 × 8 = 72 square feet of tile."},
      {s:"3.MD.C.7",q:"An L-shaped room splits into a 10×6 and a 4×3 rectangle. Total area?",o:["60 sq ft","72 sq ft","76 sq ft","80 sq ft"],a:"72 sq ft",e:"10×6=60 and 4×3=12. Total = 60+12 = 72 sq ft."},
      {s:"3.MD.D.8",q:"A rectangle has perimeter 36 in and length 11 in. What is its width?",o:["5 in","6 in","7 in","8 in"],a:"7 in",e:"P=2(l+w). 36=2(11+w). 18=11+w. w=7 in."},
      {s:"3.NF.A.1",q:"A pizza has 6 equal slices. You eat 4. What fraction is LEFT?",o:["4/6","2/6","6/4","1/6"],a:"2/6",e:"6−4=2 slices left. 2 out of 6 = 2/6."},
      {s:"3.NF.A.2",q:"On a 0-to-1 number line split into 8 equal parts, which fraction is closest to 1?",o:["3/8","4/8","6/8","7/8"],a:"7/8",e:"7/8 is the closest fraction to 1 without equaling it. It is 1/8 away from 1."},
      {s:"3.NF.A.3",q:"Ethan says 4/6 = 2/3. Correct?",o:["No, 4 ≠ 2","Yes, same point on a number line","No, 4/6 is always larger","Yes, but only for rectangles"],a:"Yes, same point on a number line",e:"4/6 and 2/3 are equivalent fractions naming the same point on the number line."},
      {s:"3.G.A.1",q:"Which group includes squares, rectangles, AND rhombuses?",o:["Triangles","Quadrilaterals","Pentagons","Hexagons"],a:"Quadrilaterals",e:"Squares, rectangles, and rhombuses all have 4 sides → all quadrilaterals."},
    ]
  },
  {
    id:5, title:"Test Set 5", sub:"Mix E · All Units",
    icon:"💎", g:["#11998e","#38ef7d"],
    qs:[
      {s:"3.OA.A.1",q:"An egg carton has 4 rows of 6 eggs. Which expression gives the total?",o:["4+6","4×6","6÷4","4−6"],a:"4×6",e:"4 rows × 6 eggs = 4×6 = 24 eggs. Rows × columns = array multiplication."},
      {s:"3.OA.A.2",q:"64 students line up in 8 equal rows. Students per row?",o:["6","7","8","9"],a:"8",e:"64 ÷ 8 = 8. Check: 8 × 8 = 64 ✓"},
      {s:"3.OA.A.4",q:"Find the unknown: 27 ÷ □ = 3",o:["3","7","8","9"],a:"9",e:"27 ÷ 9 = 3. Related fact: 3 × 9 = 27."},
      {s:"3.OA.B.6",q:"Solve 72 ÷ 8 using a related multiplication fact.",o:["8","9","7","6"],a:"9",e:"8 × 9 = 72, so 72 ÷ 8 = 9."},
      {s:"3.OA.C.7",q:"There are 7 days in a week. How many days in 9 weeks?",o:["56","63","72","16"],a:"63",e:"9 × 7 = 63 days. Know this multiplication fact from memory."},
      {s:"3.OA.D.8",q:"Nina earns $5 per dog walk. She walks 6 dogs Saturday and 4 Sunday. Total earned?",o:["$30","$40","$50","$10"],a:"$50",e:"Total dogs = 6+4=10. Earnings = 10×$5 = $50."},
      {s:"3.NBT.A.1",q:"Which number rounds to 460 when rounded to the nearest ten?",o:["451","463","465","470"],a:"463",e:"463: ones digit is 3 < 5, so round down. Tens digit stays at 6. 463 → 460."},
      {s:"3.NBT.A.2",q:"A school collected 856 canned goods in October and 279 more in November. Total?",o:["1,025","1,035","1,125","1,135"],a:"1,135",e:"856 + 279: 6+9=15 (carry 1), 5+7+1=13 (carry 1), 8+2+1=11 → 1,135."},
      {s:"3.NBT.A.3",q:"A crate has 6 layers of 80 cans each. Total cans?",o:["86","480","4,800","148"],a:"480",e:"6 × 80 = 6 × 8 × 10 = 48 × 10 = 480."},
      {s:"3.MD.A.1",q:"A dish bakes 35 min then cools 20 min. Put in oven at 4:15 p.m. When is it ready?",o:["4:50 p.m.","5:05 p.m.","5:10 p.m.","5:15 p.m."],a:"5:10 p.m.",e:"Baking: 4:15 + 35 = 4:50. Cooling: 4:50 + 20 = 5:10 p.m."},
      {s:"3.MD.C.5",q:"A figure is covered by 6 rows of 7 unit squares. What is the area and why?",o:["13 sq units; adding","42 sq units; rows × columns = area","42 sq units; skip counting only","36 sq units; subtracting"],a:"42 sq units; rows × columns = area",e:"6 rows × 7 columns = 42 unit squares. Tiling reveals that area = side × side."},
      {s:"3.MD.C.7",q:"A flower bed is 8 ft long and 5 ft wide. Area?",o:["8+5","2×(8+5)","8×5=40 sq ft","8−5"],a:"8×5=40 sq ft",e:"Area = l × w = 8 × 5 = 40 sq ft."},
      {s:"3.MD.D.8",q:"A hexagonal path has 6 equal sides and perimeter 54 ft. Each side length?",o:["6 ft","7 ft","8 ft","9 ft"],a:"9 ft",e:"P = 6 × side. 54 = 6 × s. s = 54 ÷ 6 = 9 ft."},
      {s:"3.NF.A.1",q:"A ribbon is divided into 4 equal parts. Each part is what fraction?",o:["4/1","4/4","1/4","1/2"],a:"1/4",e:"Unit fraction: 1 part of 4 equal parts = 1/4."},
      {s:"3.NF.A.3",q:"Which fraction is greater than 1/3 but less than 1?",o:["1/6","1/8","1/2","3/2"],a:"1/2",e:"1/2 ≈ 0.5 > 1/3 ≈ 0.33, and 0.5 < 1. The others are either smaller or > 1."},
      {s:"3.G.A.2",q:"A circle is cut into 8 equal parts, 3 shaded. A rectangle is cut into 4 equal parts, 3 shaded. Are the shaded fractions equal?",o:["Yes, both show 3 shaded","No, 3/8 ≠ 3/4","Yes, same count","They can't be compared"],a:"No, 3/8 ≠ 3/4",e:"Circle shows 3/8; rectangle shows 3/4. Same numerator, different denominators → 3/8 < 3/4."},
      {s:"3.MD.B.4",q:"Pencil lengths: 5in, 5in, 5½in, 6in, 6in, 6in, 6½in. How many pencils measure exactly 6 in?",o:["1","2","3","4"],a:"3",e:"Count 6-inch pencils: 6 in, 6 in, 6 in → 3 pencils."},
      {s:"3.MD.B.3",q:"A bar graph (scale: each square = 5) shows 4 squares for cats and 6 squares for dogs. How many more dogs than cats?",o:["2","5","10","30"],a:"10",e:"Dogs = 6×5=30. Cats = 4×5=20. 30−20=10 more dogs."},
    ]
  },
  {
    id:6, title:"Test Set 6", sub:"Mix F · All Units",
    icon:"🔥", g:["#F953C6","#B91D73"],
    qs:[
      {s:"3.OA.A.1",q:"A classroom has 6 rows of desks with 5 desks in each row. Total desks?",o:["11","25","30","56"],a:"30",e:"6 rows × 5 desks = 30 desks. Equal groups → multiplication."},
      {s:"3.OA.A.2",q:"35 students split equally into 7 groups. Students per group?",o:["4","5","6","7"],a:"5",e:"35 ÷ 7 = 5. Check: 7 × 5 = 35 ✓"},
      {s:"3.OA.A.3",q:"A recipe makes 4 cookies per batch. Sam makes 9 batches, then gives 6 away. How many cookies does Sam keep?",o:["27","30","36","42"],a:"30",e:"Total = 4×9=36. Keeps = 36−6=30 cookies."},
      {s:"3.OA.A.4",q:"Find the unknown: □ ÷ 7 = 6",o:["13","36","42","48"],a:"42",e:"6 × 7 = 42, so 42 ÷ 7 = 6."},
      {s:"3.OA.B.5",q:"Explain why 5 × 0 = 0 using properties.",o:["Identity property","Zero property of multiplication","Commutative property","Associative property"],a:"Zero property of multiplication",e:"Any number multiplied by 0 equals 0. This is the zero property of multiplication."},
      {s:"3.OA.C.7",q:"What is 7 × 8?",o:["54","56","48","63"],a:"56",e:"7 × 8 = 56. A multiplication fact to know by memory."},
      {s:"3.OA.D.8",q:"Pens come in packs of 3. Leo buys 4 packs and uses 5 pens. Pens remaining?",o:["p=3+4−5","p=(3×4)−5=7","p=3×4+5","p=4÷3+5"],a:"p=(3×4)−5=7",e:"Total pens = 3×4=12. Used 5: 12−5=7 remaining."},
      {s:"3.OA.D.9",q:"In a multiplication table, 4 times any number is always even. Why?",o:["4 is less than 5","Multiplying by 4 is like doubling twice, always giving an even result","4+4=8","4 is an odd number"],a:"Multiplying by 4 is like doubling twice, always giving an even result",e:"4×n = 2×(2×n). Doubling twice always gives an even number."},
      {s:"3.NBT.A.1",q:"Round 834 to the nearest ten.",o:["800","830","840","900"],a:"830",e:"Ones digit of 834 is 4 < 5, so round down. 834 → 830."},
      {s:"3.NBT.A.2",q:"A school raised $564 in the fall and $378 in the spring. Total raised?",o:["$832","$842","$932","$942"],a:"$942",e:"564 + 378: 4+8=12 (carry 1), 6+7+1=14 (carry 1), 5+3+1=9 → $942."},
      {s:"3.NBT.A.3",q:"What is 6 × 70?",o:["76","42","420","4,200"],a:"420",e:"6 × 7 = 42, then × 10 = 420."},
      {s:"3.MD.A.1",q:"Anya's piano lesson is 45 minutes. It ends at 5:15 p.m. What time did it start?",o:["4:15 p.m.","4:25 p.m.","4:30 p.m.","4:45 p.m."],a:"4:30 p.m.",e:"Work backwards: 5:15 − 45 min. 5:15 − 15 = 5:00, then − 30 more = 4:30 p.m."},
      {s:"3.MD.A.2",q:"A water bottle holds 750 mL. After drinking 300 mL, how much is left?",o:["250 mL","400 mL","450 mL","1,050 mL"],a:"450 mL",e:"750 − 300 = 450 mL remaining."},
      {s:"3.MD.C.7",q:"A park is 12 m long. Using distributive property, 12 × 8 = (10 × 8) + (□ × 8). What is □?",o:["2","3","4","12"],a:"2",e:"12 = 10 + 2. Distributive: 12×8 = (10×8) + (2×8) = 80+16 = 96."},
      {s:"3.MD.D.8",q:"A triangle has sides 7 cm, 9 cm, and 5 cm. What is its perimeter?",o:["21 cm","16 cm","35 cm","63 cm"],a:"21 cm",e:"Perimeter = sum of all sides = 7+9+5 = 21 cm."},
      {s:"3.NF.A.1",q:"There are 3 equal pieces of a sandwich. You eat 1 piece. What fraction remains?",o:["1/3","2/3","3/2","1/2"],a:"2/3",e:"You ate 1/3. Remaining = 3/3 − 1/3 = 2/3."},
      {s:"3.NF.A.3",q:"Which number line fraction is equivalent to 2/6?",o:["1/2","1/4","1/3","2/4"],a:"1/3",e:"2/6 = 1/3. Both represent the same amount: 1 of 3 equal parts."},
      {s:"3.G.A.1",q:"Kyle draws a 4-sided shape where opposite sides are equal but angles are NOT right angles. What shape is it?",o:["Rectangle","Square","Rhombus","Trapezoid"],a:"Rhombus",e:"A rhombus has 4 equal sides but its angles are not necessarily 90°."},
    ]
  },
  {
    id:7, title:"Test Set 7", sub:"Mix G · All Units",
    icon:"🌈", g:["#1FA2FF","#12D8FA"],
    qs:[
      {s:"3.OA.A.1",q:"Kenji arranges 24 chairs in 4 equal rows. How many chairs per row?",o:["4","5","6","8"],a:"6",e:"24 ÷ 4 = 6. This is an equal groups division problem."},
      {s:"3.OA.A.3",q:"A bus can hold 48 students. There are 3 buses. Total students that can ride?",o:["51","120","144","144"],a:"144",e:"3 × 48 = 144. Equal groups: 3 buses × 48 students."},
      {s:"3.OA.A.4",q:"What is the unknown? 6 × □ = 54",o:["7","8","9","6"],a:"9",e:"6 × 9 = 54. Check: 54 ÷ 6 = 9 ✓"},
      {s:"3.OA.B.5",q:"Which equation shows the identity property of multiplication?",o:["5×0=0","5×1=5","5+0=5","5×5=25"],a:"5×1=5",e:"Identity property: any number × 1 = that same number. 5 × 1 = 5."},
      {s:"3.OA.B.6",q:"Find 81 ÷ 9 by thinking of the unknown-factor: 9 × □ = 81.",o:["7","8","9","6"],a:"9",e:"9 × 9 = 81, so 81 ÷ 9 = 9."},
      {s:"3.OA.C.7",q:"What is 8 × 9?",o:["63","72","81","54"],a:"72",e:"8 × 9 = 72. Know all products of two one-digit numbers from memory by end of Grade 3."},
      {s:"3.OA.D.8",q:"A farmer has 5 fields with 9 rows of corn each. He harvests 3 rows due to frost. Rows of corn still growing?",o:["r=5+9−3","r=(5×9)−3=42","r=5×9×3","r=5×(9−3)=30"],a:"r=(5×9)−3=42",e:"Total rows = 5×9=45. Harvested 3: 45−3=42 rows still growing."},
      {s:"3.NBT.A.1",q:"Round 1,459 to the nearest hundred.",o:["1,400","1,450","1,500","1,000"],a:"1,500",e:"Look at tens digit of 1,459 which is 5 ≥ 5. Round hundreds up: 1,400 → 1,500."},
      {s:"3.NBT.A.2",q:"A hiker walked 418 meters on day 1 and 365 meters on day 2. Total meters?",o:["773","783","793","873"],a:"783",e:"418 + 365: 8+5=13 (carry 1), 1+6+1=8, 4+3=7 → 783."},
      {s:"3.NBT.A.3",q:"There are 50 students in each grade. There are 8 grades. Total students?",o:["58","400","4,000","450"],a:"400",e:"8 × 50 = 8 × 5 × 10 = 40 × 10 = 400."},
      {s:"3.MD.A.1",q:"A movie starts at 7:10 p.m. and runs for 1 hour 30 minutes. End time?",o:["8:10 p.m.","8:30 p.m.","8:40 p.m.","9:40 p.m."],a:"8:40 p.m.",e:"7:10 + 1 hr = 8:10, then + 30 min = 8:40 p.m."},
      {s:"3.MD.A.2",q:"A bowl of fruit weighs 2 kg. The bowl itself weighs 400 g. How heavy is the fruit only? (1 kg=1,000 g)",o:["1,400 g","1,600 g","1,800 g","2,400 g"],a:"1,600 g",e:"2 kg = 2,000 g. 2,000 − 400 = 1,600 g of fruit."},
      {s:"3.MD.C.6",q:"A tiled wall has 7 rows of 9 tiles (each 1 sq ft). Area of the wall?",o:["16 sq ft","56 sq ft","63 sq ft","81 sq ft"],a:"63 sq ft",e:"7 × 9 = 63 square feet."},
      {s:"3.MD.D.8",q:"A rectangular yard has area 48 sq m and width 6 m. What is the length?",o:["6 m","7 m","8 m","9 m"],a:"8 m",e:"Area = l × w. 48 = l × 6. l = 48 ÷ 6 = 8 m."},
      {s:"3.NF.A.2",q:"On a 0-to-1 number line with 8 equal parts, at which point is the fraction 3/8?",o:["Before 1/2","After 1/2","At exactly 1/2","At exactly 1/4"],a:"Before 1/2",e:"1/2 = 4/8. Since 3/8 < 4/8, the point is before the halfway mark."},
      {s:"3.NF.A.3",q:"Which fraction equals a whole number?",o:["5/3","7/4","6/6","5/6"],a:"6/6",e:"When numerator = denominator, the fraction = 1 whole. 6/6 = 1."},
      {s:"3.G.A.2",q:"A shape is partitioned into 8 equal parts. 5 parts are shaded. What fraction is shaded?",o:["8/5","3/8","5/3","5/8"],a:"5/8",e:"5 shaded parts out of 8 equal parts = 5/8."},
      {s:"3.MD.B.3",q:"A scaled bar graph uses 1 square = 10 books. The bar for Mystery shows 4 squares. How many mystery books?",o:["4","10","14","40"],a:"40",e:"4 squares × 10 books per square = 40 mystery books."},
    ]
  },
  {
    id:8, title:"Test Set 8", sub:"Mix H · All Units",
    icon:"🎯", g:["#FF8008","#FFC837"],
    qs:[
      {s:"3.OA.A.1",q:"A store arranges apples in 4 rows with 7 apples in each row. Total apples?",o:["11","21","28","47"],a:"28",e:"4 × 7 = 28 apples. Array model: 4 rows × 7 columns."},
      {s:"3.OA.A.2",q:"56 books are sorted equally into 8 bins. How many books per bin?",o:["6","7","8","9"],a:"7",e:"56 ÷ 8 = 7. Check: 8 × 7 = 56 ✓"},
      {s:"3.OA.A.3",q:"A charity packs 6 cans into each bag. They have 9 bags. Then 4 more cans are donated. Total cans?",o:["54","58","60","19"],a:"58",e:"6×9=54 cans in bags. Plus 4 donated = 58 total."},
      {s:"3.OA.A.4",q:"Find the unknown: □ × 8 = 40",o:["4","5","6","7"],a:"5",e:"5 × 8 = 40. Check: 40 ÷ 8 = 5 ✓"},
      {s:"3.OA.B.5",q:"Using the associative property, which is another way to compute 2 × 3 × 4?",o:["(2+3)×4","2×(3×4)=24","2×3+4","6÷4"],a:"2×(3×4)=24",e:"Associative property: (2×3)×4 = 2×(3×4) = 24."},
      {s:"3.OA.C.7",q:"What is 4 × 7?",o:["24","28","32","35"],a:"28",e:"4 × 7 = 28. Know this multiplication fact from memory."},
      {s:"3.OA.D.8",q:"Ana collects 8 shells a day for 5 days. She gives 12 to her sister. Shells Ana has?",o:["s=8+5−12","s=(8×5)−12=28","s=8×5×12","s=8×(5−12)"],a:"s=(8×5)−12=28",e:"Collected = 8×5=40. Gave away 12: 40−12=28 shells."},
      {s:"3.OA.D.9",q:"In a multiplication table, why are all products in the row for 10 multiples of 10?",o:["Because 10 is even","Multiplying by 10 adds a zero in the ones place","Because 10>5","10 is after 9"],a:"Multiplying by 10 adds a zero in the ones place",e:"10 × n = n0 in place value (ones become 0, n shifts to tens). This is a place-value pattern."},
      {s:"3.NBT.A.1",q:"Round 372 to the nearest ten.",o:["300","360","370","380"],a:"370",e:"Ones digit of 372 is 2 < 5, so round down. 372 → 370."},
      {s:"3.NBT.A.2",q:"A pool had 700 gallons of water. After a storm, it has 945 gallons. How much was added?",o:["145","245","845","1,645"],a:"245",e:"945 − 700 = 245 gallons were added."},
      {s:"3.NBT.A.3",q:"There are 3 rows of 90 plants in a greenhouse. Total plants?",o:["93","270","2,700","30"],a:"270",e:"3 × 90 = 3 × 9 × 10 = 27 × 10 = 270."},
      {s:"3.MD.A.1",q:"Breakfast prep takes 15 min and eating takes 20 min. If you start at 7:25 a.m., when do you finish?",o:["7:55 a.m.","8:00 a.m.","8:05 a.m.","8:10 a.m."],a:"8:00 a.m.",e:"7:25 + 15 min = 7:40. Then + 20 min = 8:00 a.m."},
      {s:"3.MD.A.2",q:"A puppy weighs 4 kg. A kitten weighs 800 g. Combined weight in grams? (1 kg=1,000 g)",o:["4,800 g","4,008 g","800 g","5,600 g"],a:"4,800 g",e:"4 kg = 4,000 g. 4,000 + 800 = 4,800 g total."},
      {s:"3.MD.C.7",q:"A rectangle is 8 cm wide and (6+4) cm long. Area using distributive property?",o:["8×10=80 sq cm","8+10=18","80+6","(8+6)×(8+4)"],a:"8×10=80 sq cm",e:"8×(6+4) = (8×6)+(8×4) = 48+32 = 80. Or simply 8×10=80 sq cm."},
      {s:"3.MD.D.8",q:"A rectangle has perimeter 22 cm and width 3 cm. What is its length?",o:["5 cm","7 cm","8 cm","11 cm"],a:"8 cm",e:"P=2(l+w). 22=2(l+3). 11=l+3. l=8 cm."},
      {s:"3.NF.A.1",q:"A pie is cut into 8 equal slices. After the party, 3 slices remain. What fraction remains?",o:["5/8","3/5","3/8","8/3"],a:"3/8",e:"3 slices left out of 8 total equal slices = 3/8."},
      {s:"3.NF.A.3",q:"Order from least to greatest: 1/4, 1/2, 1/8.",o:["1/8, 1/4, 1/2","1/2, 1/4, 1/8","1/4, 1/8, 1/2","1/8, 1/2, 1/4"],a:"1/8, 1/4, 1/2",e:"With numerator 1, larger denominator = smaller fraction. So 1/8 < 1/4 < 1/2."},
      {s:"3.G.A.1",q:"A square is always a rectangle. True or false?",o:["False — different number of sides","True — a square has 4 sides and 4 right angles, which makes it a rectangle","False — squares have equal sides","True — squares and rectangles are the same shape"],a:"True — a square has 4 sides and 4 right angles, which makes it a rectangle",e:"A square meets all requirements of a rectangle (4 sides, 4 right angles, opposite sides equal) + has all equal sides."},
    ]
  },
  {
    id:9, title:"Test Set 9", sub:"Mix I · All Units",
    icon:"🧩", g:["#8E2DE2","#4A00E0"],
    qs:[
      {s:"3.OA.A.1",q:"Aria places stickers in 8 rows with 6 stickers in each row. Total stickers?",o:["14","36","48","56"],a:"48",e:"8 rows × 6 stickers = 8×6 = 48 stickers."},
      {s:"3.OA.A.2",q:"42 students split equally into groups of 6. How many groups?",o:["6","7","8","9"],a:"7",e:"42 ÷ 6 = 7 groups. Check: 7 × 6 = 42 ✓"},
      {s:"3.OA.A.3",q:"A garden has 9 flower beds with 7 flowers each. 8 flowers wilt. Flowers remaining?",o:["55","63","71","56"],a:"55",e:"Total = 9×7=63. Wilted 8: 63−8=55 flowers remain."},
      {s:"3.OA.A.4",q:"Find the unknown: 5 × □ = 35",o:["6","7","8","5"],a:"7",e:"5 × 7 = 35. Check: 35 ÷ 5 = 7 ✓"},
      {s:"3.OA.B.5",q:"Which shows the commutative property?",o:["3×(4×5)=(3×4)×5","3×4 = 4×3","3×(4+5)=3×4+3×5","3×1=3"],a:"3×4 = 4×3",e:"Commutative property: order doesn't matter. 3×4 = 4×3 = 12."},
      {s:"3.OA.C.7",q:"What is 6 × 7?",o:["35","42","36","49"],a:"42",e:"6 × 7 = 42. Know this multiplication fact from memory."},
      {s:"3.OA.D.8",q:"There are 4 vans carrying 8 students each and 2 more students walk. Total students?",o:["t=4+8+2","t=(4×8)+2=34","t=4×(8+2)","t=4×8×2"],a:"t=(4×8)+2=34",e:"Students in vans = 4×8=32. Plus 2 walking: 32+2=34."},
      {s:"3.NBT.A.1",q:"Round 4,752 to the nearest hundred.",o:["4,700","4,750","4,800","5,000"],a:"4,800",e:"Tens digit of 4,752 is 5 ≥ 5. Round hundreds up: 4,700 → 4,800."},
      {s:"3.NBT.A.2",q:"A town has 615 oak trees and 287 maple trees. How many total?",o:["892","902","802","912"],a:"902",e:"615 + 287: 5+7=12 (carry 1), 1+8+1=10 (carry 1), 6+2+1=9 → 902."},
      {s:"3.NBT.A.3",q:"What is 4 × 80?",o:["32","320","3,200","84"],a:"320",e:"4 × 8 = 32, then × 10 = 320."},
      {s:"3.MD.A.1",q:"A train leaves at 11:45 a.m. and arrives 2 hours 15 minutes later. Arrival time?",o:["1:45 p.m.","2:00 p.m.","2:15 p.m.","2:45 p.m."],a:"2:00 p.m.",e:"11:45 + 2 hr = 1:45 p.m. Then + 15 min = 2:00 p.m."},
      {s:"3.MD.A.2",q:"A fish tank holds 20 liters. It currently has 13 liters. How many more liters to fill it?",o:["7 L","8 L","9 L","33 L"],a:"7 L",e:"20 − 13 = 7 liters needed."},
      {s:"3.MD.C.7",q:"A patio is made of two rectangular sections: 8m×5m and 3m×4m. Total area?",o:["48 sq m","52 sq m","40 sq m","32 sq m"],a:"52 sq m",e:"8×5=40 and 3×4=12. Total = 40+12 = 52 sq m."},
      {s:"3.MD.D.8",q:"An octagonal fountain has 8 equal sides with perimeter 64 ft. Side length?",o:["6 ft","7 ft","8 ft","9 ft"],a:"8 ft",e:"P = 8 × side. 64 = 8 × s. s = 64 ÷ 8 = 8 ft."},
      {s:"3.NF.A.1",q:"Maria reads 2 chapters out of 6 equal chapters. Fraction read?",o:["2/8","1/6","2/6","6/2"],a:"2/6",e:"2 chapters of 6 equal chapters = 2/6. (Also equal to 1/3.)"},
      {s:"3.NF.A.2",q:"A number line from 0 to 1 is split into 3 equal parts. Where is 2/3?",o:["Before 1/2","Past 1/2","At exactly 1/2","At 1"],a:"Past 1/2",e:"1/2 is at the halfway point. 2/3 ≈ 0.667 > 0.5, so it is past the halfway point."},
      {s:"3.G.A.2",q:"A hexagon is divided into 6 equal triangles. What fraction is each triangle?",o:["6/1","3/6","1/3","1/6"],a:"1/6",e:"Each of 6 equal parts of a whole = 1/6."},
      {s:"3.MD.B.3",q:"A pictograph uses 1 symbol = 4 students. The row for Art shows 5 symbols. How many students chose Art?",o:["5","9","16","20"],a:"20",e:"5 symbols × 4 students per symbol = 20 students chose Art."},
    ]
  },
  {
    id:10, title:"Test Set 10", sub:"Mix J · All Units",
    icon:"🎖️", g:["#009FFF","#ec2F4B"],
    qs:[
      {s:"3.OA.A.1",q:"A bookshelf has 7 shelves with 9 books on each shelf. Total books?",o:["16","54","63","72"],a:"63",e:"7 × 9 = 63. Seven groups of 9 books."},
      {s:"3.OA.A.2",q:"Sixty students are split equally into 5 teams. Students per team?",o:["10","11","12","15"],a:"12",e:"60 ÷ 5 = 12. Check: 5 × 12 = 60 ✓"},
      {s:"3.OA.A.3",q:"A florist puts 8 flowers in each vase. There are 6 vases. 5 flowers are set aside. Total flowers counted?",o:["48","43","53","19"],a:"53",e:"Vases: 8×6=48. Plus 5 set aside: 48+5=53."},
      {s:"3.OA.A.4",q:"Find the unknown: 4 = 36 ÷ □",o:["7","8","9","6"],a:"9",e:"36 ÷ 9 = 4. Related fact: 4 × 9 = 36."},
      {s:"3.OA.B.5",q:"Using the distributive property, 7 × 12 = 7 × (10 + 2) = ?",o:["70+2=72","7×10+7×2=84","70+12=82","7+10+7+2=26"],a:"7×10+7×2=84",e:"7×(10+2) = (7×10)+(7×2) = 70+14 = 84."},
      {s:"3.OA.C.7",q:"What is 3 × 8?",o:["21","24","27","28"],a:"24",e:"3 × 8 = 24. A multiplication fact to know from memory."},
      {s:"3.OA.D.8",q:"A baker bakes 6 trays of 8 cookies each day for 3 days. Total cookies?",o:["c=6+8+3","c=(6×8)×3=144","c=6×8+3","c=6+8×3"],a:"c=(6×8)×3=144",e:"Per day: 6×8=48. For 3 days: 48×3=144 cookies."},
      {s:"3.NBT.A.1",q:"Which number rounds to 900 to the nearest hundred?",o:["849","850","951","850 and 900"],a:"850",e:"850: tens digit is 5 ≥ 5. Round up hundreds: 800 → 900. So 850 rounds to 900."},
      {s:"3.NBT.A.2",q:"A mountain trail is 876 m one way. How long is the round trip?",o:["1,642 m","1,652 m","1,752 m","1,762 m"],a:"1,752 m",e:"876 + 876: 6+6=12 (carry 1), 7+7+1=15 (carry 1), 8+8+1=17 → 1,752 m."},
      {s:"3.NBT.A.3",q:"What is 9 × 50?",o:["45","450","4,500","59"],a:"450",e:"9 × 5 = 45, then × 10 = 450."},
      {s:"3.MD.A.1",q:"Class begins at 8:05 a.m. Math is 50 min, then reading is 40 min. When does reading end?",o:["9:05 a.m.","9:25 a.m.","9:35 a.m.","10:15 a.m."],a:"9:35 a.m.",e:"Math: 8:05 + 50 = 8:55. Reading: 8:55 + 40 = 9:35 a.m."},
      {s:"3.MD.A.2",q:"A dog weighs 18 kg. A cat weighs 4,500 g. How many grams heavier is the dog? (1 kg=1,000 g)",o:["13,500 g","14,500 g","22,500 g","23,500 g"],a:"13,500 g",e:"18 kg = 18,000 g. 18,000 − 4,500 = 13,500 g heavier."},
      {s:"3.MD.C.7",q:"A rectangle 7 ft × 9 ft sits next to a 3 ft × 9 ft rectangle. Total area of combined shape?",o:["63 sq ft","27 sq ft","90 sq ft","126 sq ft"],a:"90 sq ft",e:"7×9=63 and 3×9=27. Total=63+27=90 sq ft. (Or: (7+3)×9 = 10×9 = 90.)"},
      {s:"3.MD.D.8",q:"Two rectangles: one is 8×3 with area 24 sq m. What rectangle has same area but different perimeter?",o:["4×6","2×10","Both A and B","6×4=24"],a:"Both A and B",e:"4×6=24 ✓ (P=20). 2×10=20 ✓ (P=24). Both have area 24. Same area, different perimeters."},
      {s:"3.NF.A.1",q:"A bag of 8 counters: 3 are red. What fraction are NOT red?",o:["3/8","5/3","5/8","8/5"],a:"5/8",e:"Not red = 8−3=5. Fraction = 5 out of 8 = 5/8."},
      {s:"3.NF.A.2",q:"Locate 4/4 on a number line from 0 to 1. Where is it?",o:["At 0","At 1/2","At 3/4","At 1"],a:"At 1",e:"4/4 = 1 whole. It is located at the point labeled 1 on the number line."},
      {s:"3.NF.A.3",q:"Which comparison is CORRECT?",o:["1/3 > 1/2","3/4 > 1/2","2/8 > 2/4","1/6 = 1/4"],a:"3/4 > 1/2",e:"3/4 = 0.75 and 1/2 = 0.5. So 3/4 > 1/2 ✓"},
      {s:"3.MD.B.4",q:"8 students measured their jumps in half-foot units: 2, 2½, 2, 3, 2½, 3, 3½, 2½ feet. How many jumped exactly 2½ feet?",o:["1","2","3","4"],a:"3",e:"Count the 2½-foot entries: 2½, 2½, 2½ → 3 students."},
    ]
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const DOMAIN_COLORS = {"3.OA":"#FF6B6B","3.NBT":"#4ECDC4","3.NF":"#A855F7","3.MD":"#F59E0B","3.G":"#10B981"};
const dc = s => { for(const [k,v] of Object.entries(DOMAIN_COLORS)) if(s.startsWith(k)) return v; return "#6B7280"; };
const gradeOf = p => p>=90?"A":p>=80?"B":p>=70?"C":p>=60?"D":"F";
const msgOf = p => p>=90?"Outstanding! 🏆":p>=80?"Great work! 🌟":p>=70?"Good job! ⭐":p>=50?"Keep practicing! 💪":"Don't give up! 📚";

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen]   = useState("home");
  const [si, setSi]           = useState(null);   // set index
  const [qi, setQi]           = useState(0);      // question index
  const [ans, setAns]         = useState({});
  const [rev, setRev]         = useState(null);
  const [vis, setVis]         = useState(true);
  const bodyRef               = useRef(null);

  const go = dir => {
    const max = SETS[si].qs.length - 1;
    const next = qi + dir;
    if (next < 0 || next > max) return;
    setVis(false);
    setTimeout(() => { setQi(next); setVis(true); bodyRef.current?.scrollTo(0,0); }, 180);
  };

  const startTest = idx => { setSi(idx); setQi(0); setAns({}); setRev(null); setScreen("test"); };
  const submit    = () => setScreen("results");
  const retry     = () => { setQi(0); setAns({}); setScreen("test"); };

  const calcScore = () => {
    if (si===null) return {c:0,t:0,p:0};
    const qs = SETS[si].qs;
    const c = qs.filter((q,i)=>ans[i]===q.a).length;
    return {c, t:qs.length, p:Math.round(c/qs.length*100)};
  };

  // ── HOME ────────────────────────────────────────────────────────────────────
  if (screen==="home") return (
    <div style={{minHeight:"100vh",background:"#08090A",padding:"20px 14px",fontFamily:"system-ui,sans-serif"}}>
      <div style={{maxWidth:680,margin:"0 auto"}}>

        {/* Header */}
        <div style={{textAlign:"center",marginBottom:28,paddingTop:8}}>
          <div style={{fontSize:52,marginBottom:6}}>🧮</div>
          <h1 style={{color:"#F8FAFC",fontSize:28,margin:"0 0 6px",letterSpacing:"-0.5px",fontWeight:900}}>
            Grade 3 Math Practice Tests
          </h1>
          <p style={{color:"#64748B",fontSize:13,margin:0}}>
            New Jersey Student Learning Assessments · 2026 · All Units · 10 Test Sets
          </p>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center",marginTop:14}}>
            {[["3.OA Operations","#FF6B6B"],["3.NBT Numbers","#4ECDC4"],["3.NF Fractions","#A855F7"],["3.MD Measurement","#F59E0B"],["3.G Geometry","#10B981"]].map(([l,c])=>(
              <span key={l} style={{background:c+"18",border:`1px solid ${c}40`,color:c,borderRadius:99,padding:"3px 11px",fontSize:11,fontWeight:700}}>{l}</span>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {SETS.map((set,i)=>(
            <button key={i} onClick={()=>startTest(i)} style={{
              background:"#111318",border:"1px solid #1E2530",borderRadius:16,
              padding:"16px 14px",cursor:"pointer",textAlign:"left",
              transition:"all 0.18s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.background="#161C26";e.currentTarget.style.borderColor="#2A3545";e.currentTarget.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="#111318";e.currentTarget.style.borderColor="#1E2530";e.currentTarget.style.transform="";}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <div style={{
                  width:42,height:42,borderRadius:11,flexShrink:0,
                  background:`linear-gradient(135deg,${set.g[0]},${set.g[1]})`,
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,
                  boxShadow:`0 3px 10px ${set.g[0]}44`,
                }}>{set.icon}</div>
                <div>
                  <div style={{color:"#F1F5F9",fontWeight:800,fontSize:14}}>{set.title}</div>
                  <div style={{color:"#475569",fontSize:11}}>{set.qs.length} questions</div>
                </div>
              </div>
              <div style={{color:"#64748B",fontSize:11,marginBottom:8,lineHeight:1.4}}>{set.sub}</div>
              <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                {[...new Set(set.qs.map(q=>q.s.split(".").slice(0,2).join(".")))].map(d=>(
                  <span key={d} style={{fontSize:9,color:dc(d),background:dc(d)+"18",borderRadius:99,padding:"2px 6px",fontWeight:700}}>{d}</span>
                ))}
              </div>
            </button>
          ))}
        </div>

        <p style={{textAlign:"center",color:"#334155",fontSize:11,marginTop:20}}>
          180 original questions · Aligned to NJ Grade 3 Math Standards (3.OA · 3.NBT · 3.NF · 3.MD · 3.G)
        </p>
      </div>
    </div>
  );

  // ── TEST ────────────────────────────────────────────────────────────────────
  if (screen==="test") {
    const set = SETS[si];
    const qs  = set.qs;
    const q   = qs[qi];
    const chosen = ans[qi];
    const pct = ((qi+1)/qs.length*100);
    const doneCount = Object.keys(ans).length;
    const allDone   = doneCount===qs.length;
    const sc = dc(q.s);
    const labels = ["A","B","C","D"];

    return (
      <div style={{height:"100vh",display:"flex",flexDirection:"column",background:"#08090A",fontFamily:"system-ui,sans-serif"}} ref={bodyRef}>

        {/* ── HEADER ── */}
        <div style={{background:"#0D0F13",borderBottom:"1px solid #1A2030",padding:"10px 14px",flexShrink:0}}>
          <div style={{maxWidth:660,margin:"0 auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <button onClick={()=>setScreen("home")} style={{background:"#1A2030",border:"1px solid #2A3545",borderRadius:8,padding:"5px 11px",color:"#94A3B8",cursor:"pointer",fontSize:12}}>← Home</button>
              <div style={{textAlign:"center"}}>
                <div style={{color:"#E2E8F0",fontWeight:800,fontSize:13}}>{set.title}</div>
                <div style={{color:"#475569",fontSize:11}}>{doneCount}/{qs.length} answered</div>
              </div>
              <span style={{background:`linear-gradient(135deg,${set.g[0]},${set.g[1]})`,borderRadius:99,padding:"4px 11px",color:"#fff",fontWeight:800,fontSize:12}}>
                {qi+1}/{qs.length}
              </span>
            </div>

            {/* Progress bar */}
            <div style={{background:"#1A2030",borderRadius:99,height:5,overflow:"hidden",marginBottom:7}}>
              <div style={{height:5,borderRadius:99,width:`${pct}%`,background:`linear-gradient(90deg,${set.g[0]},${set.g[1]})`,transition:"width 0.35s ease"}}/>
            </div>

            {/* Dot nav */}
            <div style={{display:"flex",gap:3,flexWrap:"wrap",justifyContent:"center"}}>
              {qs.map((_,i)=>(
                <button key={i} onClick={()=>{setVis(false);setTimeout(()=>{setQi(i);setVis(true);},150);}}
                  style={{
                    width:22,height:22,borderRadius:"50%",border:"none",cursor:"pointer",
                    fontSize:9,fontWeight:800,transition:"all 0.15s",
                    background: i===qi ? `linear-gradient(135deg,${set.g[0]},${set.g[1]})` : ans[i] ? "#1E3A30" : "#151B25",
                    color: i===qi?"#fff":ans[i]?"#34D399":"#334155",
                    boxShadow: i===qi?`0 0 8px ${set.g[0]}66`:"none",
                  }}>{i+1}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ── QUESTION BODY ── */}
        <div style={{flex:1,overflowY:"auto",padding:"18px 14px"}}>
          <div style={{maxWidth:660,margin:"0 auto"}}>
            <div style={{
              background:"#111318",borderRadius:18,border:`1px solid ${sc}28`,
              padding:"22px 18px",
              opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(8px)",
              transition:"opacity 0.18s,transform 0.18s",
              boxShadow:`0 4px 20px ${sc}0C`,
              marginBottom:14,
            }}>
              <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
                <span style={{background:sc+"20",color:sc,borderRadius:99,padding:"3px 10px",fontSize:11,fontWeight:700}}>{q.s}</span>
                <span style={{background:"#1A2030",color:"#475569",borderRadius:99,padding:"3px 10px",fontSize:11}}>Question {qi+1}</span>
              </div>
              <p style={{color:"#E2E8F0",fontSize:16,lineHeight:1.7,margin:"0 0 20px",fontWeight:500}}>{q.q}</p>

              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {q.o.map((opt,oi)=>{
                  const picked = chosen===opt;
                  return (
                    <button key={oi} onClick={()=>setAns(p=>({...p,[qi]:opt}))} style={{
                      background: picked?`${set.g[0]}18`:"#0D0F13",
                      border:`2px solid ${picked?set.g[0]:"#1E2530"}`,
                      borderRadius:11,padding:"13px 14px",
                      display:"flex",alignItems:"center",gap:10,
                      cursor:"pointer",textAlign:"left",transition:"all 0.14s",
                      boxShadow: picked?`0 0 12px ${set.g[0]}33`:"none",
                    }}>
                      <span style={{
                        width:28,height:28,borderRadius:"50%",flexShrink:0,
                        background: picked?`linear-gradient(135deg,${set.g[0]},${set.g[1]})`:"#1A2030",
                        display:"flex",alignItems:"center",justifyContent:"center",
                        fontSize:11,fontWeight:800,color:picked?"#fff":"#64748B",
                      }}>{labels[oi]}</span>
                      <span style={{color:picked?"#F1F5F9":"#94A3B8",fontSize:14,lineHeight:1.4}}>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nav */}
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <button onClick={()=>go(-1)} disabled={qi===0} style={{
                flex:"0 0 90px",background:qi===0?"#0D0F13":"#1A2030",
                border:`1px solid ${qi===0?"#111":"#2A3545"}`,borderRadius:11,padding:"12px",
                color:qi===0?"#2A3545":"#CBD5E1",cursor:qi===0?"not-allowed":"pointer",
                fontSize:13,fontWeight:700,
              }}>← Prev</button>

              {qi<qs.length-1 ? (
                <button onClick={()=>go(1)} style={{
                  flex:1,background:`linear-gradient(135deg,${set.g[0]},${set.g[1]})`,
                  border:"none",borderRadius:11,padding:"12px",
                  color:"#fff",cursor:"pointer",fontSize:14,fontWeight:800,
                  boxShadow:`0 4px 14px ${set.g[0]}44`,
                }}>Next →</button>
              ) : (
                <button onClick={submit} style={{
                  flex:1,background:allDone?"linear-gradient(135deg,#10B981,#059669)":"linear-gradient(135deg,#334155,#1E293B)",
                  border:"none",borderRadius:11,padding:"12px",
                  color:"#fff",cursor:"pointer",fontSize:14,fontWeight:800,
                  boxShadow:allDone?"0 4px 16px #10B98144":"none",
                }}>{allDone?"✓ Submit Test":`Submit (${doneCount}/${qs.length})`}</button>
              )}
            </div>

            {allDone && qi<qs.length-1 && (
              <button onClick={submit} style={{
                width:"100%",marginTop:10,background:"transparent",
                border:"1px solid #10B98133",borderRadius:11,padding:"9px",
                color:"#10B981",cursor:"pointer",fontSize:13,fontWeight:700,
              }}>All answered — Submit now ✓</button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── RESULTS ────────────────────────────────────────────────────────────────
  if (screen==="results") {
    const set = SETS[si];
    const qs  = set.qs;
    const {c,t,p} = calcScore();
    const grade = gradeOf(p);
    const gradeColor = p>=80?"#10B981":p>=60?"#F59E0B":"#EF4444";

    // Missed by domain
    const missed = {};
    qs.forEach((q,i)=>{ if(ans[i]!==q.a){ const d=q.s.split(".").slice(0,2).join("."); missed[d]=(missed[d]||0)+1; }});

    return (
      <div style={{minHeight:"100vh",background:"#08090A",padding:"20px 14px",fontFamily:"system-ui,sans-serif"}}>
        <div style={{maxWidth:660,margin:"0 auto"}}>

          {/* Score hero */}
          <div style={{
            background:`linear-gradient(135deg,${set.g[0]},${set.g[1]})`,
            borderRadius:22,padding:"28px 24px",textAlign:"center",marginBottom:16,
            boxShadow:`0 8px 28px ${set.g[0]}44`,
          }}>
            <div style={{fontSize:48,marginBottom:4}}>{set.icon}</div>
            <h1 style={{color:"#fff",fontSize:24,margin:"0 0 4px",fontWeight:900}}>{msgOf(p)}</h1>
            <p style={{color:"rgba(255,255,255,0.75)",margin:"0 0 20px",fontSize:13}}>{set.title} · {set.sub}</p>
            <div style={{display:"flex",justifyContent:"center",gap:24,flexWrap:"wrap"}}>
              {[{l:"Score",v:`${p}%`},{l:"Grade",v:grade},{l:"Correct",v:`${c}/${t}`},{l:"Missed",v:`${t-c}`}].map(({l,v})=>(
                <div key={l}><div style={{color:"#fff",fontSize:34,fontWeight:900,lineHeight:1}}>{v}</div><div style={{color:"rgba(255,255,255,0.7)",fontSize:12}}>{l}</div></div>
              ))}
            </div>
          </div>

          {/* Missed domains */}
          {Object.keys(missed).length>0 && (
            <div style={{background:"#111318",borderRadius:14,padding:"14px 16px",marginBottom:14,border:"1px solid #1A2030"}}>
              <div style={{color:"#64748B",fontSize:12,fontWeight:700,marginBottom:8}}>📌 Focus Areas:</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                {Object.entries(missed).map(([d,n])=>(
                  <span key={d} style={{background:dc(d)+"18",color:dc(d),border:`1px solid ${dc(d)}35`,borderRadius:99,padding:"3px 11px",fontSize:12,fontWeight:700}}>{d} ({n} missed)</span>
                ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div style={{display:"flex",gap:10,marginBottom:18}}>
            <button onClick={()=>setScreen("home")} style={{flex:1,background:"#111318",border:"1px solid #1A2030",borderRadius:11,padding:"12px",color:"#CBD5E1",cursor:"pointer",fontSize:13,fontWeight:700}}>🏠 Home</button>
            <button onClick={retry} style={{flex:1,background:`linear-gradient(135deg,${set.g[0]},${set.g[1]})`,border:"none",borderRadius:11,padding:"12px",color:"#fff",cursor:"pointer",fontSize:13,fontWeight:700}}>🔄 Retry</button>
          </div>

          {/* Review */}
          <div style={{color:"#475569",fontSize:13,fontWeight:700,marginBottom:10}}>Full Answer Review · {t} Questions</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {qs.map((q,i)=>{
              const userAns = ans[i];
              const correct = userAns===q.a;
              const open = rev===i;
              const sc = dc(q.s);
              const labels = ["A","B","C","D"];

              return (
                <div key={i} style={{background:"#111318",borderRadius:13,overflow:"hidden",border:`1px solid ${correct?"#10B98122":"#EF444422"}`}}>
                  <button onClick={()=>setRev(open?null:i)} style={{
                    width:"100%",background:"transparent",border:"none",
                    padding:"12px 14px",cursor:"pointer",
                    display:"flex",alignItems:"center",gap:10,textAlign:"left",
                  }}>
                    <span style={{
                      width:30,height:30,borderRadius:"50%",flexShrink:0,
                      background:correct?"#10B98118":"#EF444418",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:15,border:`1px solid ${correct?"#10B98140":"#EF444440"}`,
                    }}>{correct?"✓":"✗"}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,color:correct?"#10B981":"#EF4444",fontWeight:700,marginBottom:1}}>
                        Q{i+1} · <span style={{color:sc}}>{q.s}</span>
                      </div>
                      <div style={{fontSize:12,color:"#64748B",lineHeight:1.4}}>{q.q.length>68?q.q.slice(0,68)+"…":q.q}</div>
                    </div>
                    <span style={{color:"#334155",fontSize:11}}>{open?"▲":"▼"}</span>
                  </button>

                  {open && (
                    <div style={{padding:"0 14px 14px",borderTop:"1px solid #1A2030"}}>
                      <p style={{color:"#CBD5E1",fontSize:13,lineHeight:1.7,margin:"12px 0 10px"}}>{q.q}</p>
                      <div style={{display:"flex",flexDirection:"column",gap:5,marginBottom:12}}>
                        {q.o.map((opt,oi)=>{
                          const isUser = userAns===opt;
                          const isRight = q.a===opt;
                          return (
                            <div key={oi} style={{
                              display:"flex",alignItems:"center",gap:8,padding:"7px 10px",borderRadius:8,
                              background:isRight?"#10B98110":isUser&&!isRight?"#EF444410":"#0D0F13",
                              border:`1px solid ${isRight?"#10B98135":isUser&&!isRight?"#EF444435":"#1A2030"}`,
                            }}>
                              <span style={{
                                width:22,height:22,borderRadius:"50%",
                                background:isRight?"#10B981":isUser&&!isRight?"#EF4444":"#1A2030",
                                display:"flex",alignItems:"center",justifyContent:"center",
                                fontSize:10,fontWeight:800,color:"#fff",flexShrink:0,
                              }}>{labels[oi]}</span>
                              <span style={{color:isRight?"#10B981":isUser&&!isRight?"#EF4444":"#475569",fontSize:12}}>
                                {isRight?"✓ ":isUser&&!isRight?"✗ ":""}{opt}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      {!userAns && <div style={{color:"#F59E0B",fontSize:12,marginBottom:8}}>⚠️ Not answered</div>}
                      <div style={{background:"#0D0F13",borderRadius:9,padding:"10px 12px",border:`1px solid ${sc}25`}}>
                        <div style={{color:sc,fontSize:11,fontWeight:700,marginBottom:3}}>💡 Explanation</div>
                        <div style={{color:"#94A3B8",fontSize:12,lineHeight:1.6}}>{q.e}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div style={{height:28}}/>
        </div>
      </div>
    );
  }

  return null;
}
