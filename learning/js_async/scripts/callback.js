// Lade die ul in die Variable $status
var $status = $('#status');
console.log($status);

// Reihenfolge, in der geladen werden soll:
// Profile, Tweets, (Mentioned) Friend
// Funktion:
//  1. Lade ein Profile
//  2. Lade alle Tweets
//  3. Lade den mentionedUser (also einen User) aus dem ersten Tweet anhand der in tweets.json hinterlegten ID
//  4. In tweets ist die ID des mentionedUser 10 und in friend.json ist die User-ID auch 10
$.ajax({
  type: "GET",
  url: "content/profile.json",
  success: function(profile) {
    $status.append("<li>loaded profile</li>");
    $("#profile-pre").html(JSON.stringify(profile));
    $.ajax({
      type: "GET",
      url: "content/tweets.json?id=" + profile.id,  // Profil-ID wird nicht berücksichtigt, nur zu Demonstrationszwecken
      success: function(tweets) {                   // Liefer alle Tweets zurück
        $status.append("<li>loaded tweets</li>");
        $("#tweets-pre").html(JSON.stringify(tweets));
        $.ajax({
          type: "GET",
          url: "content/friend.json?id=" + tweets[0].usersMentioned[0].id,
          success: function(friend) {
            $status.append("<li>loaded friend</li>");
            $("#friend-pre").html(JSON.stringify(friend));
          },
          error: function(xhr, status, error) {
            $status.append("<li>error (xhr): " + xhr.toString() + "</li>");
            $status.append("<li>error (status): " + status.toString() + "</li>");
            $status.append("<li>error (error): " + error.toString() + "</li>");
          }
        });
      },
      error: function(xhr, status, error) {
        $status.append("<li>error (xhr): " + xhr.toString() + "</li>");
        $status.append("<li>error (status): " + status.toString() + "</li>");
        $status.append("<li>error (error): " + error.toString() + "</li>");
      }
    });
  },
  error: function(xhr, status, error) {
    $status.append("<li>error (xhr): " + xhr.toString() + "</li>");
    $status.append("<li>error (status): " + status.toString() + "</li>");
    $status.append("<li>error (error): " + error.toString() + "</li>");
  }
});
