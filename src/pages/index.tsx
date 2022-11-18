import Head from "next/head";

const Home = () => {
  const copy = (text: string) => {
    window.navigator.clipboard
      .writeText(text)
      .then((_) => alert("copiado com sucesso"))
      .catch((_) => alert("erro ao copiar"));
  };

  const copyPromise = (promise: Promise<any>) => {
    navigator.clipboard
      .write([
        new ClipboardItem({
          "text/plain": new Promise(async (resolve) => {
            resolve(await promise);
          }),
        }),
      ])
      .then((_) => alert("copiado com sucesso"))
      .catch((err) => {
        alert("erro ao copiar"), console.log(err);
      });
  };

  const clipboardUserAgent = async () => {
    function detected(regex: RegExp): boolean {
      const userAgent = window?.navigator.userAgent;
      return new RegExp(regex).test(userAgent);
    }

    const isSafari = detected(/safari/i) && !detected(/chrome|chromium|crios/i);

    const promise = fetch("https://jsonplaceholder.typicode.com/todos/6")
      .then((it) => it.json())
      .then((it) => `https://google.com.br/search?q=${it.title}`);
    if (isSafari) {
      copyPromise(promise);
    } else {
      copy(await promise);
    }
  };

  const copyShare = async () => {
    try {
      const { title } = await fetch(
        "https://jsonplaceholder.typicode.com/todos/6"
      ).then((it) => it.json());
      const shareData = {
        title: "titulo do share",
        url: `https://google.com.br/search?q=${title}`,
      };
      await navigator.share(shareData);
      alert("copiado com sucesso");
    } catch (err) {
      alert(`Error: ${err}`);
    }
  };

  const dynamicCopyOrShare = () => {
    if (typeof navigator?.share !== "undefined") {
      copyShare();
    } else {
      clipboardUserAgent();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2 w-screen h-screen">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button onClick={clipboardUserAgent} className="px-2 bg-black text-white">
        botao copy
      </button>
      <button onClick={copyShare} className="px-2 bg-black text-white">
        botao share
      </button>
      <button onClick={dynamicCopyOrShare} className="px-2 bg-black text-white">
        botao dinamico
      </button>
    </div>
  );
};

export default Home;
