import { useEffect, useState } from 'react';

function detectDevTools() {
  var devtools = /./;
  devtools.toString = function() {
    this.opened = true;
  };

  console.debug('%cdvt', devtools);

  return devtools.opened;
}

export default function useDevToolsDetector() {
  const [open, setOpen] = useState(detectDevTools());
  const [uri, setUri] = useState(null);
  const [error, setError] = useState(null);

  useEffect(async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/json/list?t=${new Date().getTime()}`,
        {
          mode: 'cors',
        },
      );
      const responseJson = await response.json();
      const editorItem = responseJson.find(item => /:3000/.test(item.url));

      setUri(`http://localhost:8000${editorItem.devtoolsFrontendUrl}`);

      const interval = setInterval(() => {
        const opened = detectDevTools();
        if (opened !== open) {
          setOpen(opened);
        }
      }, 5000);

      return () => clearInterval(interval);
    } catch (err) {
      setError(err);
      return null;
    }
  }, false);

  return { error, open, uri };
}
