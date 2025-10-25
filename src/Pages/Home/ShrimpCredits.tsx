/* eslint no-irregular-whitespace: 0 */

const creditHtmlComment = `
<!--
      FRIENDSHRIMP concept by Ian Miller
      Original website (homepage) written by Jeremy Stewart
      Ported to React and modified by Ian Miller

      
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　＿　　　 ＿
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　,===x'￣＼ 　 /　 \`　 ／　 ヽ
　　　　　　　　　　　　　　　　　　　　　　　　　　＿,─'￣　 // ~.|　 |　/　　　／
　　　　　　　　　　　　　　　　　　　　　＿,─'￣ 　 _ ./i.| .//　／ ／l//_　ｒ-┴─x,,,
　　　　　　　　　　　　　　　　＿,─'￣　　　　　　/i.| |_|.| |.| _/::: //　r-'￣──,,,___＼
　　　　　　　　　　　　　　 ／　　　　　　　　　　　|_|.|　|.| |.|// ／l_／ ~￣/　.／／ ＼＼
　　　　　　　　　　　　　／ 　　　　　　　　　/~|　　| | .|.|／　　　　　　　　/／__/　　 　| |
　　　　　　　　　　　 ／　　　　　　　　　　 //l |　　|.|／　　　　　　　　　//r─-,,===- | |-
　　　　　　　　　　　　　　　　　　　　　 _＿|.|__| |　／　　　　　　　　　　／／￣~x──,,＼=-
　　　　　　　　　　　　　　　　　　　 　 /r-─t | |/　　　　　　　　　　　//＿二二''""i~~ 　 ＼
　　　　　　　　　　　　　　　　　　　　//　　　 |.|/　 -,,　　　　　　　　:　　　　＿／￣ 　　 　　|
　　　　　　　　　　　　　　　　 　 　／　　　　／￣＼ ~\`ヽ　　　　　 ／￣￣　　　　　　　　 　 |
　　　　　　　　　　　　　　　　　　　　　 　 ／￣~＼ ヽヽ　ヽ　　　／　　　　　　　　　　　　　　 |
　　　　　　　　　　　　　　　　　　　　 　／￣~＼ 　ヽ l .ヽ_　_,,,／　　　　　　　　　　　　　　　　|
　　　　　　　　　　　　　　　　　　　　／￣~＼　 ヽ　 | .／:~'''-──e.　　　　　　　　　　　　　 |
　　　　　　　　　　　　　　　　　 　 ／￣~＼　ヽ　 l .／ ￣'''-──x, .|　　　　　　　　　　　　　|
　　　　　　　　　　　　　　　　 　 ／￣~＼　　ヽ | ／　　　　　　　　 | |　　　　　　　　　　　 　 |
　　　　　　　　　　　　　　　　　/￣~＼　　ヽ 　l／　　　　　　　　 　 |.|　　　　　　　　　　　　 |
　　　　　　　　　　　　　　　_／￣~＼　ヽ 　|／　　　　　　　　　　 　 ||　　　　　　　　　　　　|
　　　　　　　　　　　i''""￣/　 　　　 ヽ _l／　　　　　　　　　　　　　 '
　　　　　　　　　 　 |　／　/　 　　 /　ｌ ヽ
　　　　　　　　　　　l,　　 /　　　　/ 　 |　|
　　　　　　　　　　　 ヽ,,,x,,_　　　/　　ノ　ヽ
　　　　　　　　　　　　　　　＼,,　　　　　　 |
　　　　　　　　　　　　　　　　　~''-─-─-
 -->
`;

const ShrimpCredits: React.FC = () => (
  <section
    className="credits"
    dangerouslySetInnerHTML={{ __html: creditHtmlComment }}
  />
);

export default ShrimpCredits;
