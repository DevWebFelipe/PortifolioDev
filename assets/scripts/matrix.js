document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("matrixCanvas")
  const toggleButton = document.getElementById("toggleMatrix")
  const ctx = canvas.getContext("2d")

  let animationActive = localStorage.getItem("matrixEnabled") !== "false"
  let animationInterval

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const binary = ["0", "1"]
  const fontSize = 16
  let columns = canvas.width / fontSize
  let drops = Array.from({ length: columns }).fill(1)

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#0f8a0fa6"
    ctx.font = `${fontSize}px Inconsolata, monospace`

    for (let i = 0; i < drops.length; i++) {
      const text = binary[Math.floor(Math.random() * binary.length)]
      const x = i * fontSize
      const y = drops[i] * fontSize

      ctx.fillText(text, x, y)

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }

      drops[i]++
    }
  }

  function startMatrix() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drops = Array.from({ length: columns }).fill(1)

    if (!animationInterval) {
      animationInterval = setInterval(drawMatrix, 50)
    }

    canvas.classList.remove("paused")
    toggleButton.textContent = "Pausar matrix"
  }

  function stopMatrix() {
    clearInterval(animationInterval)
    animationInterval = null

    canvas.classList.add("paused")
    toggleButton.textContent = "Ativar matrix"
  }

  function toggleMatrix() {
    animationActive = !animationActive
    localStorage.setItem("matrixEnabled", animationActive)

    if (animationActive) {
      startMatrix()
    } else {
      stopMatrix()
    }
  }

  function handleResize() {
    const oldColumns = columns
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    columns = canvas.width / fontSize

    if (columns > oldColumns) {
      // Adiciona mais colunas ao array sem resetar o resto
      const extra = Array.from({ length: columns - oldColumns }).fill(1)
      drops.push(...extra)
    } else if (columns < oldColumns) {
      // Remove colunas extras
      drops.length = columns
    }
  }

  toggleButton.addEventListener("click", toggleMatrix)
  window.addEventListener("resize", handleResize)

  if (animationActive) {
    startMatrix()
  } else {
    stopMatrix()
  }
})
