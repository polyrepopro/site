<script>
  import { onMount } from "svelte";

  let theme = "light";
  let mounted = false;

  onMount(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      theme = storedTheme;
      if (storedTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
    }
    mounted = true;
  });

  function handleClick() {
    theme = theme === "light" ? "dark" : "light";

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }

  $: otherTheme = theme === "dark" ? "light" : "dark";
</script>

<button
  type="button"
  class="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
  aria-label={mounted ? `Switch to ${otherTheme} theme` : "Toggle theme"}
  on:click={handleClick}
>
  <svg
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    class="h-5 w-5 stroke-zinc-900 dark:hidden"
  >
    <path d="M12.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
    <path
      stroke-linecap="round"
      d="M10 5.5v-1M13.182 6.818l.707-.707M14.5 10h1M13.182 13.182l.707.707M10 15.5v-1M6.11 13.889l.708-.707M4.5 10h1M6.11 6.111l.708.707"
    />
  </svg>
  <svg
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    class="hidden h-5 w-5 stroke-white dark:block"
  >
    <path
      d="M15.224 11.724a5.5 5.5 0 0 1-6.949-6.949 5.5 5.5 0 1 0 6.949 6.949Z"
    />
  </svg>
</button>
