#pragma strict

// An array with the sprites used for animation
var animSprites: Sprite[];

// Controls how fast to change the sprites when
// animation is running
var framesPerSecond: float;

// Reference to the renderer of the sprite
// game object
private var animRenderer: SpriteRenderer;

// Time passed since the start of animatin
private var timeAtAnimStart: float;

// Indicates whether animation is running or not
private var animRunning: boolean = false;

// Speed of the movement
var speed: float = 4f;

// Direction of the movement
private   var movementDir: int;

// When object loads...
function Start () {
   // Get a reference to game object renderer and
   // cast it to a Sprite Rendere
   animRenderer = renderer as SpriteRenderer;
}

// At fixed time intervals...
function FixedUpdate () {
   if(!animRunning) {
      // The animation is triggered by user input
      //var userInput: float = Input.GetAxis("Horizontal");
      //if(userInput != 0f) {
         // User pressed the move left or right button
         
         // Animation will start playing
         animRunning = true;
         
         // Record time at animation start
         timeAtAnimStart = Time.timeSinceLevelLoad;
         
         // Get the direction of the movement from the sign
         // of the axis input (-ve is left, +ve is right)
         if(movementDir!=-1){
            movementDir = 1; //Mathf.Sign(userInput);
            }
      //}
   }
}

function OnTriggerEnter2D(other : Collider2D) {
   //var enemyWave : EnemyWaveClass;

   // Check if colliding with the left or right wall
   // (by checking the tags of the collider that the enemy
   //  collided with)
   if(other.tag == "LeftWall") {
      // If collided with the left wall, get a reference
      // to the EnemyWave object, which should be a component
      // of enemies parent
      //enemyWave = transform.parent.GetComponent(EnemyWaveClass);
      // Set direction of the wave
      //enemyWave.SetDirectionRight();
      movementDir=1;      
   } else if(other.tag == "RightWall") {
      // If collided with the right wall, get a reference
      // to the EnemyWave object, which should be a component
      // of enemies parent
      //enemyWave = transform.parent.GetComponent(EnemyWaveClass);
      // Set direction of the wave
      //enemyWave.SetDirectionLeft();
      movementDir= -1;
   }             
}



// Before rendering next frame...
function Update() {   
   
   if(animRunning) {
      // Animation is running, so we need to 
      // figure out what frame to use at this point
      // in time
      
      // Compute number of seconds since animation started playing
      var timeSinceAnimStart: float;
      timeSinceAnimStart = Time.timeSinceLevelLoad - timeAtAnimStart;

      // Compute the index of the next frame    
      var frameIndex: int;
      frameIndex = timeSinceAnimStart * framesPerSecond;

      // The frog in the sprites faces left; when its Scale.X value is positive it will
      // keep facing left, when its Scale.X value is negative it will face right.  So,
      // the signs for Scale.X correspond to opposite directions of the movementDir.
      // So, when movementDir is -ve, make sure Scale.X is +ve, and when movementDir is
      // +ve, makse sure Scale.X is -ve.  
      transform.localScale.x = Mathf.Abs(transform.localScale.x)* movementDir;

      if(frameIndex < animSprites.Length) {
         // Let the renderer know which sprite to
         // use next      
         animRenderer.sprite = animSprites[ frameIndex ];
         // Move the game object only when showing the 3rd and 4th frames
         // (when the frog is in the air)
         //if(frameIndex >= 2 && frameIndex <= 3) {
            // Move the game object
            var shift: Vector3;
            shift = Vector3.right * movementDir * speed * Time.deltaTime;
            transform.Translate(shift);
         //}
      } else {
         // Animation finished, set the render
         // with the first sprite and stop the 
         // animation
         animRenderer.sprite = animSprites[0];
         animRunning = false;
      }
   }
}