$(document).ready(function () {
  //----------------------------------------
  // ▼ゲームの状態を保持する変数
  // 加算するための初期値として0を指定
  //----------------------------------------
  let totalGames = 0;
  let wins = 0;
  let losses = 0;
  let draws = 0;

  //----------------------------------------
  // ▼top画面 / "じゃんけんで遊ぶ" ボタンをクリックしたときの処理
  // #topScreenを非表示にして、#gameScreenを表示
  //----------------------------------------
  $("#goToGameButton").click(function () {
    $("#topScreen").hide();
    $("#gameScreen").show();
  });

  //----------------------------------------
  // ▼game"TOPへ画面 / 戻る" ボタンをクリックしたときの処理
  // #gameScreenを非表示にして、#topScreenを表示
  // 表示済みの相手の手、勝敗結果を削除（""で上書き）
  //----------------------------------------
  $("#goToTopButton").click(function () {
    $("#gameScreen").hide();
    $("#topScreen").show();
    $("#computerChoice").text("");
    $("#result").text("");
  });

  //----------------------------------------
  // ▼.gameButton （ぐー、ちょき、ぱー）をクリックしたときの処理
  // 後に相手との手を比較するためにどの手なのかを取得
  // ※htmlのボタンにてdata-choiceを指定
  //----------------------------------------
  $(".gameButton").click(function () {
    const playerChoice = $(this).data("choice");
    playGame(playerChoice);
  });

  //----------------------------------------
  //▼resetButtonをクリックしたときの処理
  // 処理内容は後に記述
  //----------------------------------------
  $("#resetButton").click(function () {
    resetGame();
  });

  //----------------------------------------
  // ▼処理内容を以下に記述
  //----------------------------------------

  //----------------------------------------
  // ▼勝敗の比較
  //----------------------------------------

  function playGame(playerChoice) {
    const choices = ["ぐー", "ちょき", "ぱー"]; //コンピューターの選択肢
    const randomIndex = Math.floor(Math.random() * choices.length); //乱数（整数）を生成
    const computerChoice = choices[randomIndex]; //0:ぐー 1:ちょき 2:ぱー を生成した乱数を用いて選ぶ
    let outcome;

    //----------------------------------------
    // ▼プレイヤーとコンピューターが同じ手の場合、#resultに"引き分け"を返す
    // drawsに加算
    //----------------------------------------

    if (playerChoice === computerChoice) {
      outcome = "引き分け";
      draws++;
    }

    //----------------------------------------
    // ▼プレイヤーが勝ちの場合、#resultに"あなたの勝ち"を返す
    // winsに加算
    //----------------------------------------
    else if (
      (playerChoice === "ぐー" && computerChoice === "ちょき") ||
      (playerChoice === "ちょき" && computerChoice === "ぱー") ||
      (playerChoice === "ぱー" && computerChoice === "ぐー")
    ) {
      outcome = "あなたの勝ち";
      wins++;
    }

    //----------------------------------------
    // ▼プレイヤーが勝ちの場合、#resultに"あなたの負け"を返す
    // lossesに加算
    //----------------------------------------
    else {
      outcome = "あなたの負け";
      losses++;
    }

    //----------------------------------------
    // ▼#resultにテキストを挿入
    // テキスト形式 相手の手:
    // updateFooterを実行
    //----------------------------------------
    $("#computerChoice").text(`相手の手: ${computerChoice}`);
    $("#result").text(`勝敗結果: ${outcome}`);
    totalGames++;
    updateFooter();
  }

  //----------------------------------------
  // ▼#resetButtonがクリックされた場合、各値を0にする
  // 表示済みの相手の手、勝敗結果を削除（""で上書き）
  // updateFooterを実行
  //----------------------------------------
  function resetGame() {
    totalGames = 0;
    wins = 0;
    losses = 0;
    draws = 0;
    $("#computerChoice").text("");
    $("#result").text("");
    updateFooter();
  }

  //----------------------------------------
  // ▼試合数、勝敗数を各idの元へ返す
  //----------------------------------------
  function updateFooter() {
    $("#totalGames").text(totalGames);
    $("#wins").text(wins);
    $("#losses").text(losses);
    $("#draws").text(draws);
  }
});
