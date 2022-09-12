import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

const Home: NextPage = () => {
  const [state, setState] = useState("default");

  const linkValue = useRef("");
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos/2"
      ).then((it) => it.json());
      setState(res.title);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const handleCopyWithDispatch = async (event: Event) => {
      if (linkValue.current) {
        copy(linkValue.current);
        linkValue.current = "";
        return;
      }
      if (button.current) {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/todos/2"
        ).then((it) => it.json());
        linkValue.current = res.title;
        button.current.dispatchEvent(event);
      }
    };
    const btnElement = button.current;
    btnElement?.addEventListener("click", handleCopyWithDispatch);
    return () => {
      btnElement?.removeEventListener("click", handleCopyWithDispatch);
    };
  }, [button]);

  const copy = (text: string) => {
    window.navigator.clipboard
      .writeText(text)
      .then((_) => alert("copiado com sucesso"))
      .catch((_) => alert("erro ao copiar"));
  };
  const handleAsyncClick = async () => {
    const { title } = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    ).then((it) => it.json());
    copy("async direto " + title);
  };

  const handleAsyncBindClick = async () => {
    const { title } = await fetch(
      "https://jsonplaceholder.typicode.com/todos/3"
    ).then((it) => it.json());
    copy("async bind this " + title);
  };

  const handleCopyFixed = () => {
    copy("texto fixo");
  };

  const handleCopyState = () => {
    copy("copy state " + state);
  };

  const copyWithClipboardItem = () => {
    navigator.clipboard
      .write([
        new ClipboardItem({
          "text/plain": new Promise(async (resolve) => {
            resolve(
              await fetch("https://jsonplaceholder.typicode.com/todos/2")
                .then((it) => it.json())
                .then((it) => it.title)
            );
          }),
        }),
      ])
      .then((_) => alert("copiado com sucesso"))
      .catch((err) => {
        alert("erro ao copiar"), console.log(err);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2 w-screen h-screen">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button className="px-2 bg-black text-white" onClick={handleCopyFixed}>
        botao com texto fixo
      </button>
      <button className="px-2 bg-black text-white" onClick={handleAsyncClick}>
        botao com async direto
      </button>
      <button
        className="px-2 bg-black text-white"
        onClick={handleAsyncBindClick.bind(this)}
      >
        botao com async usando bind this
      </button>
      <button className="px-2 bg-black text-white" onClick={handleCopyState}>
        botao copiando do estado
      </button>
      <button ref={button} className="px-2 bg-black text-white">
        botao com dispatchEvent
      </button>
      <button
        onClick={copyWithClipboardItem}
        className="px-2 bg-black text-white"
      >
        botao com clipboard item
      </button>
    </div>
  );
};

export default Home;
