
let step = 0;
let inventory = [];

function randomEvent() {
  const events = [
    "你听见远处传来狼嚎……",
    "一阵冷风吹来，树叶沙沙作响。",
    "你看到天上乌云密布。",
    "一只猫头鹰盯着你看。"
  ];
  return Math.random() < 0.3 ? events[Math.floor(Math.random() * events.length)] : "";
}

function show(text, choices = []) {
  document.getElementById("story").innerText = text;
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";
  choices.forEach(({ label, nextStep, action }) => {
    const btn = document.createElement("button");
    btn.innerText = label;
    btn.onclick = () => {
      if (action) action();
      step = nextStep;
      update();
    };
    choicesDiv.appendChild(btn);
  });
  const event = randomEvent();
  document.getElementById("event").innerText = event;
}

function update() {
  if (step === 1) {
    show("你在迷雾森林中醒来，前方有两条路：", [
      { label: "向左走", nextStep: 2 },
      { label: "向右走", nextStep: 3 }
    ]);
  } else if (step === 2) {
    inventory.push("古老钥匙");
    show("你遇到一个神秘老人，他给了你一把古老钥匙。", [
      { label: "继续前进", nextStep: 4 },
      { label: "返回原地", nextStep: 5 }
    ]);
  } else if (step === 3) {
    show("你来到一条小河边，有一艘小船和一座木桥：", [
      { label: "乘船过去", nextStep: 6 },
      { label: "走桥过去", nextStep: 7 }
    ]);
  } else if (step === 4) {
    show("你拿着钥匙打开一道门，成功逃出森林！🎉");
  } else if (step === 5) {
    show("你迷失了方向，无法回到原路。💀 游戏结束。");
  } else if (step === 6) {
    show("船顺利将你送到对岸，你逃出森林！🎉");
  } else if (step === 7) {
    show("桥突然断裂，你掉进了河里！💀 游戏结束。");
  }
}

function startGame() {
  step = 1;
  inventory = [];
  update();
  document.getElementById("inventory").style.display = "none";
}

function showInventory() {
  const inv = document.getElementById("inventory");
  inv.innerHTML = "<strong>你的背包：</strong><br>" + (inventory.length ? inventory.join("<br>") : "（空）");
  inv.style.display = "block";
}
