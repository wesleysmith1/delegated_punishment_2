let gameStatusComponent = {
    components: {
        'probability-bar-component': probabilityBarComponent,
        'grain-image-component': grainImageComponent,
    },
    props: {
        civiliansPerGroup: Number,
        balance: Number,
        balanceColor: String,
        stealNotification: String,
        interceptsCount: Number,
        finesCount: Number,
        reprimandsCount: Number,
        investigationCount: Number,
        defendTokenTotal: Number,
        isOfficer: Boolean,
        reviewProbability: Number,
    },
    data: function () {
        return {
            probInnocent: [24,21,18,15,12,9,6,3,0,],
            probCulprit: [24,33,42,51,60,69,78,87,96,],
        }
    },
    mounted: function () {

    },
    methods: {
        randomLocation: function () {
            return null
        }
    },
    computed: {
        probabilityCulprit() {

            return this.probCulprit[this.investigationCount]

        },
        probabilityInnocent() {
            let innocent = this.probInnocent[this.investigationCount]

            // calculate probability of officer reprimand because it depends on probability innocent
            if (this.isOfficer) {
                let probabilityReprimand = Math.round(this.reviewProbability * 3 * innocent * 10000) / 100
                this.$emit('update-probability-reprimand', probabilityReprimand)
            }
            return innocent
        },
    },
    template:
        `
            <div class="game-status-container">
                <div class="balance-container">
                    <div class="balance-label">Balance (<grain-image-component :size=20></grain-image-component>)</div>
                    <div class="balance" :style="{ color: balanceColor }"> {{balance.toFixed(0)}}</div>
            
                    <div class="notification-label">
                        <div class="steal-notification">{{stealNotification}}</div>
                    </div>
            
                    <br>
                    <br>
                </div>
                <div class="probability-container">
                    <div class="title">
                        Probability {{ isOfficer ? 'you fine' : 'fined' }}
                    </div>
                    <div class="inner">
                        <probability-bar-component
                                :label="isOfficer ? 'An innocent' : 'If you are innocent'"
                                :percent="isOfficer ? probabilityInnocent * 3 : probabilityInnocent">
                        </probability-bar-component>
                        <br>
                        <probability-bar-component
                                :label="isOfficer ? 'The culprit' : 'If you are the culprit'"
                                :percent=probabilityCulprit
                        ></probability-bar-component>
                        <br>
                        <div class="title-small data-row">
                            <div class="left">Officer tokens on investigate:</div>
                            <div class="right bold-txt"><div class="number-right-align">{{investigationCount}}/{{defendTokenTotal}}</div></div>
                        </div>
                        <div style="clear: both;"></div>
                        <br>
                    </div>
                </div>
                <div class="officer-history">
                    <div class="title">
                        Officer history
                    </div>
                    <div class="count-container">
                        <div class="title-small data-row">
                            <div class="left"># Intercepts: </div>
                            <div class="right"><strong>{{ interceptsCount }}</strong></div>
                        </div>
                        <div style="clear: both"></div>
                        <div class="title-small data-row">
                            <div class="left"># Fines: </div>
                            <div class="right"><strong>{{ finesCount }}</strong></div>
                        </div>
                        <div style="clear: both"></div>
                        <div class="title-small data-row">
                            <div class="left"># Reprimands: </div>
                            <div class="right"><strong>{{ reprimandsCount }}</strong></div>
                        </div>
                    </div>
                </div>
            </div>
        `

}