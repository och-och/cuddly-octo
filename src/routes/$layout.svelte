<script>
import '../app.css';

if (typeof localStorage != "undefined") {
	const radius = localStorage.getItem("radius")
	if (radius) {
		const r = Number(radius)
		document.documentElement.style.setProperty("--radius", r + "rem")
	}
}
</script>

<slot />
