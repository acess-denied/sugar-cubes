// Question Bank - All 25+ bubble types
const BUBBLE_BANK = [
    {
        label: "INSULIN",
        effect: -30,
        explanation: "Increases glucose uptake via GLUT4 transporters and inhibits hepatic gluconeogenesis, lowering blood glucose."
    },
    {
        label: "GLUCAGON",
        effect: +25,
        explanation: "Stimulates hepatic glycogenolysis and gluconeogenesis, increasing blood glucose levels."
    },
    {
        label: "EXERCISE",
        effect: -20,
        explanation: "Muscle contraction increases GLUT4-mediated glucose uptake without requiring insulin."
    },
    {
        label: "METFORMIN",
        effect: -15,
        explanation: "Activates AMPK and suppresses hepatic glucose production, reducing glucose levels."
    },
    {
        label: "SUGARY DRINK",
        effect: +40,
        explanation: "Rapid glucose absorption from simple carbohydrates causes acute hyperglycemia."
    },
    {
        label: "FIBER RICH FOOD",
        effect: -5,
        explanation: "Slows carbohydrate absorption, preventing sharp glucose spikes."
    },
    {
        label: "CORTISOL",
        effect: +20,
        explanation: "Increases gluconeogenesis and promotes insulin resistance during stress."
    },
    {
        label: "ADRENALINE",
        effect: +15,
        explanation: "Stimulates glycogen breakdown and inhibits insulin secretion (fight-or-flight response)."
    },
    {
        label: "GLP-1 AGONIST",
        effect: -15,
        explanation: "Enhances glucose-dependent insulin secretion and inhibits glucagon in a glucose-dependent manner."
    },
    {
        label: "SGLT2 INHIBITOR",
        effect: -20,
        explanation: "Promotes renal glucose excretion into urine, bypassing normal reabsorption mechanisms."
    },
    {
        label: "INSULIN RESISTANCE",
        effect: +30,
        explanation: "Reduced insulin responsiveness in target tissues leads to hyperglycemia despite adequate insulin."
    },
    {
        label: "HIGH CARB MEAL",
        effect: +35,
        explanation: "Large carbohydrate load causes rapid rise in blood glucose levels."
    },
    {
        label: "FASTING",
        effect: -10,
        explanation: "Prolonged absence of food intake causes mild glucose reduction via metabolic adjustment."
    },
    {
        label: "KETONE BODY PRODUCTION",
        effect: +10,
        explanation: "Fat metabolism produces ketones; slightly elevates measured glucose during ketosis."
    },
    {
        label: "PANCREATIC BETA CELL FAILURE",
        effect: +40,
        explanation: "Loss of insulin-secreting beta cells leads to severe hyperglycemia (Type 1 pathology)."
    },
    {
        label: "WEIGHT LOSS",
        effect: -10,
        explanation: "Reduced body fat improves insulin sensitivity and glucose clearance."
    },
    {
        label: "OBESITY",
        effect: +20,
        explanation: "Excess adipose tissue increases insulin resistance and impairs glucose tolerance."
    },
    {
        label: "STRESS",
        effect: +15,
        explanation: "Psychological stress elevates catecholamines and cortisol, raising blood glucose."
    },
    {
        label: "WHOLE GRAINS",
        effect: -5,
        explanation: "Complex carbohydrates with fiber slow glucose absorption and provide sustained energy."
    },
    {
        label: "SULFONYLUREA",
        effect: -20,
        explanation: "Stimulates pancreatic beta cells to release insulin, lowering blood glucose."
    },
    {
        label: "ALCOHOL",
        effect: -10,
        explanation: "Inhibits hepatic gluconeogenesis, leading to hypoglycemia risk, especially on empty stomach."
    },
    {
        label: "GLUCONEOGENESIS",
        effect: +20,
        explanation: "Hepatic synthesis of glucose from non-carbohydrate sources increases blood glucose."
    },
    {
        label: "GLYCOGEN SYNTHESIS",
        effect: -15,
        explanation: "Storage of glucose as glycogen removes glucose from circulation, lowering levels."
    },
    {
        label: "GLYCOGENOLYSIS",
        effect: +20,
        explanation: "Breakdown of liver glycogen stores releases glucose into the bloodstream."
    },
    {
        label: "INSULIN PUMP",
        effect: -25,
        explanation: "Continuous subcutaneous insulin infusion provides steady glucose control."
    },
    {
        label: "THIAZOLIDINEDIONE",
        effect: -18,
        explanation: "PPAR-gamma agonist improves insulin sensitivity in muscle and adipose tissue."
    },
    {
        label: "SLEEP DEPRIVATION",
        effect: +12,
        explanation: "Lack of sleep increases insulin resistance and cortisol levels."
    },
    {
        label: "PROTEIN MEAL",
        effect: -8,
        explanation: "Protein stimulates glucagon but also increases thermogenesis, slightly lowering net glucose."
    }
];

// Function to get random bubble from bank
function getRandomBubble() {
    return BUBBLE_BANK[Math.floor(Math.random() * BUBBLE_BANK.length)];
}

// Function to classify effect
function classifyEffect(effect) {
    if (effect < 0) return "decreases-glucose";
    if (effect > 0) return "increases-glucose";
    return "neutral-glucose";
}

// Create bubble element
function createBubbleElement(bubbleData) {
    const bubble = document.createElement('div');
    bubble.className = `bubble ${classifyEffect(bubbleData.effect)} rising`;
    bubble.textContent = bubbleData.label;
    bubble.style.left = Math.random() * (window.innerWidth - 100) + 'px';
    bubble.style.bottom = '-100px';
    
    bubble.addEventListener('click', (e) => {
        e.stopPropagation();
        popBubble(bubble, bubbleData);
    });
    
    return bubble;
}