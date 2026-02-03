import { ParentProps, createSignal } from 'solid-js';
import styles from '../styles/CodeBlock.module.css';

interface CodeBlockProps extends ParentProps {
  language?: string;
  title?: string;
}

export default function CodeBlock(props: CodeBlockProps) {
  const [copied, setCopied] = createSignal(false);

  const handleCopy = () => {
    const code = props.children?.toString() || '';
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div class={styles.container}>
      {props.title && <div class={styles.title}>{props.title}</div>}
      <div class={styles.header}>
        {props.language && (
          <span class={styles.language}>{props.language}</span>
        )}
        <button
          class={styles.copy}
          onClick={handleCopy}
          title="Copy code"
          aria-label="Copy code to clipboard"
        >
          {copied() ? '✓ Copied' : '📋 Copy'}
        </button>
      </div>
      <pre class={styles.code}>
        <code>{props.children}</code>
      </pre>
    </div>
  );
}
