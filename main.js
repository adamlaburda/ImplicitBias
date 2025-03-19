
let headlines = [
    { text: "Starmer pitches reform to 'shackled' civil servants", type: "positive" },
    { text: "Ruling parties aim to tighten Czechia's asylum policy", type: "positive" },
    { text: "Stocks fall in US and Asia over Trump tariffs concerns", type: "negative" },
    { text: "America's clean-energy industry is growing despite Trump's attacks.", type: "positive" },
    { text: "Trial begins over a plot to kill an Iranian dissident in NYC", type: "positive" },
    { text: "Congress reignites a bipartisan effort to ban hair discrimination", type: "positive" },
    { text: "How did Reform end up in such a mess?", type: "negative" },
    { text: "Choice of two evils: beware the looming mediocre contest", type: "negative" },
    { text: "Britain is dependent on US weapons. We now face a terrible choice", type: "negative" },
    { text: "Reform's shenanigans are an inevitable tragedy", type: "negative" },
    { text: "Trump's honeymoon is over", type: "negative" },
    { text: "Pope's condition improves, prognosis no longer 'guarded': Vatican", type: "positive" },
    { text: "US expects 'substantial progress' in peace talks with Ukraine", type: "positive" },
    { text: "Nearly One Million Czechs Face Poverty, But Signs of Improvement Emerge", type: "positive" },
    { text: "'Be quiet, small man': Musk clashes with Polish FM over Starlink in Ukraine", type: "negative" },
    { text: "Secretary of State Rubio Says USAID Purge Complete, With 83% of Programs Gone", type: "negative" },
    { text: "The French widely mistrust their politicians, Le Monde survey finds", type: "negative" },
    { text: "Democrats focus on Musk as the main villain in the new Trump era", type: "negative" },
    { text: "Mahmoud Khalil case goes to court, spotlighting green card holders' rights", type: "positive" },
    { text: "Civil Service reforms will be radical, minister vows", type: "positive" },
    { text: "Judge blocks Trump from enforcing 'chilling' order against law firm", type: "positive" },
    { text: "Only seven countries worldwide meet WHO dirty air guidelines, study shows", type: "negative" },
    { text: "NIH to terminate or limit grants related to vaccine hesitancy and uptake", type: "negative" },
    { text: "Starmer says benefit system unfair and indefensible", type: "negative" },
    { text: "Repowering Britain: how 'super turbines' could turbocharge green energy", type: "positive" },
    { text: "Diversity ranking shows gap between US and European PE firms as political pressure bites", type: "negative" },
    { text: "Rubio says Ukraine partial ceasefire plan 'has promise' ahead of talks", type: "positive" },
    { text: "Leaders of Rich Nations Are Deeply Unpopular. That Spells Trouble Ahead.", type: "negative" },
    { text: "Czech Defense Ministry reaffirms commitment to acquiring F-35 fighter jets", type: "positive" },
    { text: "Uganda is right to decolonise its historical and cultural landscape", type: "positive" }
];

let currentIndex = 0;
let startTime = 0;
let results = [];

function startTest() {
    document.getElementById("start").style.display = "none";
    showNextHeadline();
}

function showNextHeadline() {
    if (currentIndex >= headlines.length) {
        showResults();
        return;
    }
    document.getElementById("headline").innerText = headlines[currentIndex].text;
    startTime = Date.now();
}

document.addEventListener("keydown", function(event) {
    if (event.key === "a" || event.key === "l") {
        const reactionTime = Date.now() - startTime;
        results.push({ 
            headline: headlines[currentIndex].text, 
            time: reactionTime,
            correct: (event.key === "a" && headlines[currentIndex].type === "positive") ||
                     (event.key === "l" && headlines[currentIndex].type === "negative")
        });
        currentIndex++;
        showNextHeadline();
    }
});

function showResults() {
    let positiveTimes = results.filter(r => r.correct && headlines.find(h => h.text === r.headline).type === "positive").map(r => r.time);
    let negativeTimes = results.filter(r => r.correct && headlines.find(h => h.text === r.headline).type === "negative").map(r => r.time);

    let avgPositive = positiveTimes.reduce((a, b) => a + b, 0) / positiveTimes.length || 0;
    let avgNegative = negativeTimes.reduce((a, b) => a + b, 0) / negativeTimes.length || 0;

    let biasMessage = avgNegative < avgPositive ? 
        "Negativity bias detected" : 
        "No negativity bias detected";

    document.getElementById("results").innerHTML = `
        <h2>Test Complete!</h2>
        <p>Average Reaction Time for Positive Headlines: ${Math.round(avgPositive)} ms</p>
        <p>Average Reaction Time for Negative Headlines: ${Math.round(avgNegative)} ms</p>
        <p><strong>${biasMessage}</strong></p>
    `;
    document.getElementById("results").classList.remove("hidden");
}
