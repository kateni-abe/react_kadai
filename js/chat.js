// Firebaseの初期設定
let firebaseConfig = {
  //api情報をここに入れる
};

firebase.initializeApp(firebaseConfig);

$(document).ready(function () {
  // FirebaseのStorageとRealtime Databaseへの参照を作成
  const storageRef = firebase.storage().ref();
  const imageRef = firebase.database().ref("images");

  // ファイルアップロードの処理
  $("#uploadButton").click(async function () {
    // 選択されたファイルを取得
    const file = $("#imageFile")[0].files[0];
    if (!file) return;

    // ユニークなキーを生成（現在のタイムスタンプ）
    const uniqueKey = Date.now().toString();

    // Storageに保存するための参照を作成
    const fileRef = storageRef.child(`images/${uniqueKey}`);

    // ファイルをアップロード
    const snapshot = await fileRef.put(file);
    alert(`Uploaded ${snapshot.totalBytes} bytes.`);

    // Realtime Databaseに情報を保存
    await firebase
      .database()
      .ref(`images/${uniqueKey}`)
      .set({
        filename: file.name,
        url: `images/${uniqueKey}`,
      });

    // 画像を表示
    displayImage(uniqueKey, file.name, `images/${uniqueKey}`);
  });

  // 画像を表示する関数
  function displayImage(uniqueKey, fileName, fileUrl) {
    // ダウンロードURLを取得して画像を表示
    storageRef
      .child(fileUrl)
      .getDownloadURL()
      .then((url) => {
        const imgElement = $('<img width="300"/>').attr("src", url);
        const deleteButton = $("<button>Delete</button>").click(function () {
          // 画像を削除
          storageRef
            .child(fileUrl)
            .delete()
            .then(() => {
              // Realtime Databaseの情報も削除
              firebase.database().ref(`images/${uniqueKey}`).remove();
              // DOMから削除
              imgElement.remove();
              deleteButton.remove();
            });
        });

        // 画像と削除ボタンを追加
        $("#imageList").append(imgElement).append(deleteButton);
      });
  }

  // 初期の画像表示（ページロード時）
  imageRef.once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      // それぞれの画像情報を取得
      const uniqueKey = childSnapshot.key;
      const imageInfo = childSnapshot.val();

      // 画像を表示
      displayImage(uniqueKey, imageInfo.filename, imageInfo.url);
    });
  });
});
