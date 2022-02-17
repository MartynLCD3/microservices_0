<template>
	<v-container mt-5>
		<v-card>
        		<v-toolbar
				height="100px"
			        class="deep-purple darken-1"
        		>
          			<v-app-bar
            				flat
            				color="rgba(0, 0, 0, 0)"
          			>
					<v-toolbar-title class="text-h6 white--text pl-0">
						Administration Panel
            				</v-toolbar-title>
			                <v-spacer></v-spacer>
       		   		</v-app-bar>
	        	</v-toolbar>
		</v-card>
  		<v-expansion-panels>
    			<v-expansion-panel>
      				<v-expansion-panel-header>
					User List
      				</v-expansion-panel-header>
      				<v-expansion-panel-content>
  						<v-data-table
    							:headers="headers"
							:items="items"
							:items-per-page="5"
							class="elevation-9"
  						>
							<template v-slot:item.key="{ item }">
                            					<v-btn 
									class="deep-purple darken-1" 
									dark
									@click="showUserKey(item)"
								>
									<v-icon>
                                						mdi-key
	                            					</v-icon>
        							</v-btn>
	                				</template>
						</v-data-table>
				</v-expansion-panel-content>
    			</v-expansion-panel>
    			<v-expansion-panel>
      				<v-expansion-panel-header>
					Enable user
      				</v-expansion-panel-header>
      				<v-expansion-panel-content justify-center align="center">
    					<v-text-field
						style="padding: 0 2em;"
      						v-model="username"
      						:error-messages="nameErrors"
      						:counter="10"
      						label="Username"
      						required
      						@input="$v.username.$touch()"
      						@blur="$v.username.$touch()"
   	 				></v-text-field>
    					<v-text-field
						style="padding: 0 2em; margin-top: 1em"
      						v-model="email"
      						:error-messages="emailErrors"
      						label="E-mail"
      						required
      						@input="$v.email.$touch()"
      						@blur="$v.email.$touch()"
    					></v-text-field>
    					<v-checkbox
						style="display:inline-block;"
      						v-model="checkboxCreate"
      						label="create"
    					></v-checkbox>
					<v-checkbox
						style="display:inline-block; margin-left:1em;"
      						v-model="checkboxUpdate"
      						label="update"
    					></v-checkbox>
					<v-checkbox
						style="display:inline-block; margin-left:1em;"
      						v-model="checkboxDelete"
      						label="delete"
    					></v-checkbox>
    					<v-btn
						style="display:block"
     						class="mr-4 success"
				      		@click="submit"
    					>
      						submit
    					</v-btn>
				</v-expansion-panel-content>
    			</v-expansion-panel>
    			<v-expansion-panel>
      				<v-expansion-panel-header>
					Edit data
      				</v-expansion-panel-header>
				<v-expansion-panel-content justify-center align="center">
      					<v-text-field
						style="padding: 0 2em;"
      						v-model="emailToUpdate"
      						:error-messages="emailToUpdateErrors"
      						label="E-mail"
      						required
      						@input="$v.emailToUpdate.$touch()"
      						@blur="$v.emailToUpdate.$touch()"
    					></v-text-field>
					<v-btn
						style="display:block"
						class="mr-4 warning"
						@click="searchUser"
					>
						search user
					</v-btn>
				</v-expansion-panel-content>
    			</v-expansion-panel>
    			<v-expansion-panel >
      				<v-expansion-panel-header>
					Delete user
      				</v-expansion-panel-header>
				<v-expansion-panel-content justify-center align="center">
					<v-btn 
						class="error"
						style="margin-right: 5px"
						@click="deleteOneUser"
					>
						Delete one user
					</v-btn>
					<v-btn 
						class="error"
						style="margin-left: 5px"
						@click="deleteAllUsers"
					>
						Delete all users
					</v-btn>
				</v-expansion-panel-content>
    			</v-expansion-panel>
	  	</v-expansion-panels>
		<template>
  			<v-row justify="center">
    				<v-dialog
     					v-model="dialog"
      					persistent
      					max-width="400"
    				>
      					<v-card>
        					<v-card-title v-text="dialogTitle" class="text-h5 deep-purple darken-1 white--text"></v-card-title>
        					<v-card-text v-text="dialogBody" style="padding:1em;"></v-card-text>
						<v-text-field
							style="padding: 0 2em"
                                                	v-model="emailToDelete"
                                                  	:error-messages="emailToDeleteErrors"
                                                  	label="E-mail"
                                                  	required
                                                  	@input="$v.emailToDelete.$touch()"
                                                  	@blur="$v.emailToDelete.$touch()"
							v-if="deleteInput"
                                          	></v-text-field>
						<v-text-field
							style="padding: 0 2em"
							v-model="usernameToUpdate"
							:error-messages="usernameToUpdateErrors"
							label="Username"
							required
                                                  	@input="$v.usernameToUpdate.$touch()"
                                                  	@blur="$v.usernameToUpdate.$touch()"
							v-if="updateInput"	
						></v-text-field>
						<v-card 
							style="text-align: center; margin: 5px 2em 0;"
							v-if="checkboxesToUpdate"
						>
							<v-checkbox
								style="display:inline-block;"
	      							v-model="checkboxCreateToUpdate"
      								label="create"
    							></v-checkbox>
							<v-checkbox
								style="display:inline-block; margin-left:1em;"
      								v-model="checkboxUpdateToUpdate"
      								label="update"
    							></v-checkbox>
							<v-checkbox
								style="display:inline-block; margin-left:1em;"
      								v-model="checkboxDeleteToUpdate"
      								label="delete"
    							></v-checkbox>
						</v-card>
						<v-card-actions>
          						<v-spacer></v-spacer>
          						<v-btn
            							color="error"
            					  		text
	    							@click="dialog = false"
          						>
            							close
          						</v-btn>
							<v-btn
								color="success"
								text
								@click="deleteAllRecords"
								v-if="deleteAllBtn"
							>	
								agree
							</v-btn>
							<v-btn
								color="success"
								text
								@click="deleteOneRecord"
								v-if="deleteOneBtn"
							>
								agree
							</v-btn>
							<v-btn
								color="success"
								text
								@click="updateRecord"
								v-if="updateBtn"
							>
								agree
							</v-btn>
        					</v-card-actions>
      					</v-card>
    				</v-dialog>
  			</v-row>
		</template>
	</v-container>
</template>
<script>
	import { validationMixin } from 'vuelidate';
	import { required, maxLength, email, emailToDelete, emailToUpdate } from 'vuelidate/lib/validators';
	const url = 'http://localhost:4000/api/user/v1/';
	const apiKey = '%26apikey=$2b$10$0epm6sJ.4raMMySrVUZtJ.okOWuvXn60NNgHH6KyYNqaDr417Yo.6';
	const getAllUsers = 'get-all-users';
	const getOneUser = 'get-user'
	const newUser = 'new-user';
	const deleteAllUsers = 'delete-all-users';
	const deleteOneUser = 'delete-user';
	const updateOneUser = 'update-user';
	export default {
		mixins: [validationMixin],
		validations: {
   			username: { required, maxLength: maxLength(10) },
			usernameToUpdate: { required, maxLength: maxLength(10) },
      			email: { required, email },
			emailToDelete: { required, email },
			emailToUpdate: { required, email },
        	},
		data: () => ({
			items: [],
			deleteOneBtn: false,
			deleteAllBtn: false,
			updateBtn: false,
			checkboxesToUpdate: false,
			checkboxCreate: false,
			checkboxUpdate: false,
			checkboxDelete: false,
			checkboxCreateToUpdate: false,
			checkboxUpdateToUpdate: false,
			checkboxDeleteToUpdate: false,
			dialog: false,
			deleteInput: false,
			updateInput: false,
			username: null,
			usernameToUpdate: null,
			email: null,
			emailToDelete: null,
			emailToUpdate: null,
			dialogTitle: null,
			dialogBody: null,
        		headers: [{
            				text: 'username',
            				align: 'start',
            				value: 'username',
        	  		},
	          		{ text: 'email', value: 'email' },
	          		{ text: 'permissions', value: 'permissions' },
				{ text: 'key', value: 'key'}
        		],
			showUserKey (item) {	
				this.checkboxesToUpdate = false;
				this.deleteAllBtn = false;
				this.deleteOneBtn = false;
				this.updateBtn = false;
				this.deleteInput = false;
				this.updateInput = false;
				this.dialog = true;
				this.dialogTitle = 'User Key';
				this.dialogBody = item.key;
			},
		}),
		created() {
			fetch(`${url}${getAllUsers}${apiKey}`)
			.then(async res => {
				const userList = await res.json();
				Array.isArray(userList) ? this.items = userList : this.items = [];
			})
			.catch(err => window.location.replace('http://localhost:8080/#/error'));
		},
		computed: {
      			 nameErrors () {
        			const errors = [];
        			if (!this.$v.username.$dirty) return errors;
        			!this.$v.username.maxLength && errors.push('Name must be at most 10 characters long');
			        !this.$v.username.required && errors.push('Name is required.');
			        return errors;
      			},
      			emailErrors () {
        			const errors = [];
        			if (!this.$v.email.$dirty) return errors;
			        !this.$v.email.email && errors.push('Must be valid e-mail');
        			!this.$v.email.required && errors.push('E-mail is required');
        			return errors;
      			},
			emailToDeleteErrors () {
        			const errors = [];
        			if (!this.$v.emailToDelete.$dirty) return errors;
			        !this.$v.emailToDelete.email && errors.push('Must be valid e-mail');
        			!this.$v.emailToDelete.required && errors.push('E-mail is required');
        			return errors;
			
			},
			emailToUpdateErrors () {
        			const errors = [];
        			if (!this.$v.emailToUpdate.$dirty) return errors;
			        !this.$v.emailToUpdate.email && errors.push('Must be valid e-mail');
        			!this.$v.emailToUpdate.required && errors.push('E-mail is required');
        			return errors;
			},
			usernameToUpdateErrors () {
        			const errors = [];
        			if (!this.$v.usernameToUpdate.$dirty) return errors;
        			!this.$v.usernameToUpdate.maxLength && errors.push('Name must be at most 10 characters long');
			        !this.$v.usernameToUpdate.required && errors.push('Name is required.');
			        return errors;
			},
		},
		methods: {
      			submit () {
				this.checkboxesToUpdate = false;
				this.deleteAllBtn = false;
				this.deleteOneBtn = false;
				this.deleteInput = false;
				this.updateInput = false;
				this.updateBtn = false;
        			this.$v.username.$touch();
        			this.$v.email.$touch();
				if(this.$v.username.required && this.$v.username.maxLength &&
				   this.$v.email.required && this.$v.email.email) {
					const userList = this.items;
					const emailList = userList.map(user => user.email);
					if(emailList.includes(this.email)) {
						this.dialog = true;
						this.dialogTitle = 'Error';
						this.dialogBody = `User ${this.email} already exists`;
						return;
					};
					fetch(`${url}${newUser}${apiKey}`, {
						method: 'POST',
						mode: 'cors',
						cache: 'no-cache',
						credentials: 'same-origin',
						headers: { 'Content-type': 'application/json' },
						reidrect: 'follow',
						referrerPolicy: 'no-referrer',
						body: JSON.stringify({
							"username": this.username,
							"email": this.email,
							"services": {
								"create": this.checkboxCreate,
								"update": this.checkboxUpdate,
								"delete": this.checkboxDelete
							} 
						})
					})
					.catch(err => setTimeout(() => { console.clear() }, 100))
					setTimeout(() => {
						fetch(`${url}${getAllUsers}${apiKey}`)
                                		.then(async res => {
							const userList = await res.json();
                                	        	Array.isArray(userList) ? this.items.push(userList.pop()) : this.items = [];
                                   		})
                            	       		.catch(err => window.location.replace('http://localhost:8080/#/error'));
					}, 150);
					this.dialog = true;
					this.dialogTitle = 'Completed';
					this.dialogBody = 'User created successfully';
				};
      			},
			deleteOneUser () {
				this.checkboxesToUpdate = false;
				this.deleteOneBtn = true;
				this.deleteAllBtn = false;
				this.deleteInput = true;
				this.updateInput = false;
				this.updateBtn = false;
				this.dialog = true;
				this.dialogTitle = "Warning";
				this.dialogBody = null;
			},
			deleteAllUsers () {
				this.checkboxesToUpdate = false;
				this.deleteAllBtn = true;
				this.deleteOneBtn = false;
				this.deleteInput = false;
				this.updateBtn = false;
				this.updateInput = false;
				this.dialog = true;
				this.dialogTitle = 'Warning';
				this.dialogBody = 'Delete all records?';
			},
			deleteAllRecords () {
				const userList = this.items;
				if(userList.length > 0) {
					this.checkboxesToUpdate = false;
					this.deleteAllBtn = false;
					this.deleteOneBtn = false;
					this.deleteInput = false;
					this.updateInput = false;
					this.updateBtn = false;
					fetch(`${url}${deleteAllUsers}${apiKey}`, {
                               	 	method: 'DELETE',
						headers: { 'Content-type': 'application/json' },
					})
					.catch(err => window.location.replace('http://localhost:8080/#/error'));
					this.items = [];
					this.dialogTitle = 'Completed';
					this.dialogBody = 'No records';
					return;
				};
				this.dialogTitle = 'Error';
				this.dialogBody = 'No records';
				this.deleteAllBtn = false;
			},
			deleteOneRecord () {
				this.$v.emailToDelete.$touch();
				if(this.$v.emailToDelete.email && this.$v.emailToDelete.required) {
					const userList = this.items;
	                                const emailList = userList.map(user => user.email);
                                        if(emailList.includes(this.emailToDelete)) {
						const position = emailList.indexOf(this.emailToDelete);
						if(position !== -1) {
							userList.splice(position, 1);
						};
						fetch(`${url}${deleteOneUser}${apiKey}`, {
							method: 'DELETE',
							mode: 'cors',
							cache: 'no-cache',
							credentials: 'same-origin',
							headers: { 'Content-type': 'application/json' },
							reidrect: 'follow',
							referrerPolicy: 'no-referrer',
							body: JSON.stringify({ "email": this.emailToDelete })
						})	
						.catch(err => window.location.replace('http://localhost:8080/#/error'));
						this.dialog = true;
						this.dialogTitle = 'Completed';
						this.dialogBody = `The user ${this.emailToDelete} has been deleted`
						this.deleteInput = false;
						this.deleteOneBtn = false;
						this.updateBtn = false;
						return;
					};
					this.dialog = true;
					this.dialogTitle = 'Error';
					this.dialogBody = `The user ${this.emailToDelete} does not exist`;
					this.deleteInput = false;
					this.deleteOneBtn = false;
					this.updateBtn = false;
					this.checkboxesToUpdate = false;
				};
			},
			searchUser () {
				this.$v.emailToUpdate.$touch();
				if(this.$v.emailToUpdate.email && this.$v.emailToUpdate.required) {
					const userList = this.items;
					const emailList = userList.map(user => user.email);
					if(emailList.includes(this.emailToUpdate)) {
						this.dialog = true;
						this.dialogTitle = 'Edit user';
						this.updateInput = true;
						this.updateBtn = true;
						this.checkboxesToUpdate = true;	
						this.deleteInput = false;
						this.deleteOneBtn = false;
						this.dialogBody = null;
						return;	
					};
					this.dialog = true;
					this.dialogTitle = 'Error';
					this.updateInput = false;
					this.updateBtn = false;
					this.dialogBody = `The user ${this.emailToUpdate} does not exist`;
				};
			},
			updateRecord () {
				this.$v.usernameToUpdate.$touch();
				if(this.$v.usernameToUpdate.required && this.$v.usernameToUpdate.maxLength) {
					fetch(`${url}${updateOneUser}${apiKey}`, {
						method: 'PUT',
						mode: 'cors',
						cache: 'no-cache',
						credentials: 'same-origin',
						headers: { 'Content-type': 'application/json' },
						reidrect: 'follow',
						referrerPolicy: 'no-referrer',
						body: JSON.stringify({
							"username": this.usernameToUpdate,
							"email": this.emailToUpdate, 
							"services": {
								"create": this.checkboxCreateToUpdate,
								"update": this.checkboxUpdateToUpdate,
								"delete": this.checkboxDeleteToUpdate
							}
						})
					})
					.catch(err => window.location.replace('http://localhost:8080/#/error'));
					setTimeout(() => {
                                        	fetch(`${url}${getAllUsers}${apiKey}`)
                                                .then(async res => {
							this.items = [];
                                                	const userList = await res.json();
                                                	this.items = userList;
						})
						.catch(setTimeout(() => { console.clear() }, 100))
                                        }, 150);
					this.dialogTitle = 'Completed';
					this.dialogBody = `The user ${this.emailToUpdate} has been updated`;
					this.checkboxesToUpdate = false;
					this.updateInput = false;
					this.updateBtn = false;
				};
			},
		},
 	}
</script>
