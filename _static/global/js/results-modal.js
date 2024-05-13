let resultsModalComponent = {
    components: {
        'grain-image-component': grainImageComponent,
    },
    props: {
        resultsObject: Object,
        isOfficer: Boolean,
        income: Number, // needed to calculate officer breakdown
    },
    data: function() {
        return {

        }
    },
    methods: {
        openModal: function() {
            this.$refs.myModal.style.display = 'block';
        }
    },
    template:
        `
        <div ref="myModal" class="modal">

          <div class="modal-content results-modal">
            
            <div v-if="resultsObject" class="modal-content results-modal">
                <h4 style="text-align: center;">{{ resultsObject.title }}</h4>
                                
                <div class="list-group" style="width: 450px; margin: auto;">
                    
                    <div v-if="resultsObject.balance != null" class="list-group-item">
                        <div style="display: flex; justify-content: space-between;">
                            <div>Balance <grain-image-component :size=20></grain-image-component></div>
                            <div>{{ resultsObject.balance.toFixed(0) }}</div>
                        </div>
                    </div>      
    
                </div>
                <br>
                

            </div>
            
            
          </div>
        
        </div>
        `
}