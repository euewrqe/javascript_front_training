var a = true;
var str = 'abc';
var count = 20;
var arr = [1, 2, 3, 4];
var arr02 = ["wang", "zhang"];
var numsArr = [1, 2, 3];
var tup;
tup = [20, 'abc'];
var Season;
(function (Season) {
    Season[Season["Spring"] = 0] = "Spring";
    Season[Season["Summer"] = 1] = "Summer";
    Season[Season["autumn"] = 2] = "autumn";
    Season[Season["winter"] = 3] = "winter";
})(Season || (Season = {}));
;
var Season2;
(function (Season2) {
    Season2[Season2["Spring"] = 2] = "Spring";
    Season2[Season2["Summer"] = 3] = "Summer";
    Season2["autumn"] = "5";
    Season2["winter"] = "7d";
})(Season2 || (Season2 = {}));
;
var season = Season2[2]; // Season.Summer
function func01() {
    console.log("func01");
}
func01();
