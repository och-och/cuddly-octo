<div class="wrapper">
	<div class="spinner"></div>
</div>

<style>
.wrapper {
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
}

.spinner {
	width: 100px;
	height: 100px;
	border: var(--gap) solid #0005;
	border-top-color: transparent;
	border-radius: 50%;
	animation: forwards infinite linear 1s spin;
}

@keyframes spin {
	from { transform: rotate(0) }
	to   { transform: rotate(360deg) }
}
</style>