# Criminal Justice Simulator
***

## Initial Software Setup

Install the core software (See https://otree.readthedocs.io/en/latest/install.html)

* Python
* Pip
* Otree

Install game software
```
cd /delegated_punishment_2
pip install requirements.txt
```

Manually create folder to store data
`/delegated_punishment_2/data/`

## Launch Game

1. log into aws
2. go to lightsail
3. click on conect using `ssh`
4. restart server (if it was already running): `sudo reboot`
5. Activate virtual environement: right click to paste 
then `source venv/bin/activate`

6. type: `cd delegated_punishment_2`
7. select one treatment by specying the appropriate branch
    Dynamic officer, static stealing: `git checkout dynamic-o-bonus`
    Dynamic officer, dynamic stealing: `git checkout dynamic-bonus-steal`
    Static officer, dynamic stealing: `git checkout dynamic-steal`
    Static officer, static stealing: `git checkout main`

Then `git pull origin NAMEOFBRANCH`

check branch by using (this verifies treatment): `git branch`

8. reset database: `otree resetdb`
9. start server: `sudo -E env "PATH=$PATH" otree prodserver 80 &`
10. navigate to static ip on lab machine
11. username:admin password: my_password
12. create session with 12 participants

# To Do's
***


Update `DataDocumenation.csv`

## Fix Bugs

    "Player_StealToken" has "which map=0" indicate the starting location and  "which map=NA" indicate motion, whereas "Player_DefendTokens" has "which map=NA" indicate the starting location and "which map=0" appears rarely and for unknown reasons. "Player_DefendTokens" should be like "Player_StealToken".

    Player_StealToken has "which map=NA" when it reset to home map, but it should be "which map=0". This happens when the token times out (recorded as "EventType=steal_token_timeout") and on an interruption (recorded as "EventType=steal_token_drag")

    The column "Group_PunishmentEvents" is missing an 8th element when bonus/steal are constant (like the software used for the first experiment)
    
    Format Columns. Delete 'Group_ID_Description' (uninformative holdover from other experiments). Add 'steal_roi' (missing from sessions with Group_stealTechnology="Constant").

    Player_StealToken has "map=0" when on the harvesting screen

Minor Suggestions

    Relabel "Group_ReprimandAmound" to "Group_ReprimandTechnology" and have entries "Constant-50" instead of just "50".
    Relabel Otreee's identifying columns:  "Session_ID" to "Otree_SessionID",  "Group_PK" to "Otree_GroupPrimaryKey",  "Group_ID" to "Otree_GroupID", "Participant_ID" to "Otree_ParticipantID"
    Update the description of "Session_GlobalParameters" and relabel "Otree_GlobalParameters"

    Relabel "ROI" column to "Player_RateBalanceChanges"
    Relabel "steal_roi" column to "Player_ROIsteal"
    Combine columns "Player_HarvestAmount" and "Group_IncomeDistribution" into a single "Group_Incomes" column with entries that look like [22;[17, 22, 27, 32, 37]]

    Group_bonusTechnology should have 'WealthPercent-02' not 'WealthPercent-2' (as in Group_stealTechnology)

## Testing

SIMPLE TEST:
The following events happen in the first round of actual play

    Officer moves 3 tokens to investigate
    Officer moves 1 token to top left of each civilian
    Civilian 2 harvests twice
    Civilian 3 switches to steal
    Civilian 3 steals from Civilian 4 (top right, no intersection), and allows it to time out
    Civilian 3 steals from Civilian 4 (top left, intersection)
    Civilian 4 switches to steal
    Civilian 4 steals from Civilian 6 (bottom left, no intersection), and allows it to time out. 
    Civilian 4 switches to harvest
    Civilian 4 harvests 1 time


INTERACTIVE TEST:
Each round of actual play, Civilian 2 repeatedly steals from 3 on the top left
Each round of actual play, the officer has one defend token on the top left (causing repeated punishments)
Across rounds of actual play, the officer has more tokens on the investigate map:

    In round 1, 0 tokens on investigate
    In round 2, 1 tokens on investigate
    In round 3, 2 tokens on investigate
    ...
    In round 8, 7 tokens on investigate
    
<!--
NB: This README file was created with
    pandoc -f markdown README.md > README.html
Following the template
    https://social-science-data-editors.github.io/template_README/template-README.html
-->

