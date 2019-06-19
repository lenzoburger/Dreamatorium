#pragma strict

// The speed fo the projectile
var speed : float;

// Flag identifyng whether the projectile
// is sent by enemy or the player
var enemyProjectile : boolean;

// Per each frame...
function Update () {
   // The projectile travels up (in the direction of positive y axis), but
   // the movement is multiplies by speed (so negative speed will get 
   // move the projectile down)
   transform.Translate(Vector3.left * speed * Time.deltaTime);
}