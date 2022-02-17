<template>
	<v-container>
  		<v-card
    			style="text-align: center; margin: 2em auto;"
    			class="mx-auto"
    			max-width="400"
			v-if="card"
  		>
    			<v-img
      				height="200px"
      				src="../assets/logo.png"
    			></v-img>
    			<v-card-subtitle class="pb-0">
      				Error trying to connect to database
    			</v-card-subtitle>
      			<v-btn
	        		color="deep-purple darken-1"
				dark 
				@click="checkConnection"
				style="margin: 1em 0"
      			>
        			Try again
		        </v-btn>
  		</v-card>
		<v-progress-linear
			width="100"
      			indeterminate
      			color="deep-purple darken-1"
			v-if="progress"
    		></v-progress-linear>
	</v-container>
</template>
<script>
	setTimeout(() => { console.clear() }, 100);
	export default {
		data: () => ({
			card: true,
			progress: false,
		}),
		methods: {
			checkConnection() {
				this.progress = true;
				this.card = false;
				setTimeout(() => { window.location.replace('http://localhost:8080/') }, 5000);
			},
		},
	}
</script>
