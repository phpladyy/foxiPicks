import { useEffect } from "react";

//closing movie on escape key press
export function useKeyPress(keyCode, callback){
  useEffect(
    function () {
      function keyPressListen(e) {
        if (e.code.toLowerCase() === keyCode.toLowerCase()) {
          callback();
        }
      }
      document.addEventListener("keydown", keyPressListen);
      return function () {
        document.removeEventListener("keydown", keyPressListen);
      };
    },
    [keyCode,callback],
  );
}