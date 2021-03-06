// koffee 1.3.0

/*
0000000  000   000  00000000  000   0000000   0000000   000   000  
00        000 000   000       000  000       000   000  0000  000  
000000     00000    0000000   000  000       000   000  000 0 000  
00        000 000   000       000  000       000   000  000  0000  
0000000  000   000  00000000  000   0000000   0000000   000   000
 */
var ExeIcon, childp, empty, fs, kerror, klog, ref, slash;

ref = require('kxk'), slash = ref.slash, empty = ref.empty, fs = ref.fs, childp = ref.childp, kerror = ref.kerror, klog = ref.klog;

ExeIcon = (function() {
    function ExeIcon() {}

    ExeIcon.cache = {};

    ExeIcon.pngPath = function(opt) {
        return slash.resolve(slash.join(opt.iconDir, slash.base(opt.appPath) + ".png"));
    };

    ExeIcon.get = function(opt) {
        var pngPath;
        pngPath = ExeIcon.pngPath(opt);
        if (ExeIcon.cache[pngPath]) {
            return opt.cb(pngPath, opt.cbArg);
        } else {
            return fs.stat(pngPath, function(err, stat) {
                if ((err == null) && stat.isFile()) {
                    ExeIcon.cache[pngPath] = true;
                    return opt.cb(pngPath, opt.cbArg);
                } else {
                    return ExeIcon.getIcon(opt);
                }
            });
        }
    };

    ExeIcon.getIcon = function(opt) {
        var any2Ico, appPath, pngPath, wxw;
        appPath = slash.resolve(opt.appPath);
        pngPath = ExeIcon.pngPath(opt);
        klog('getIcon', appPath, pngPath);
        any2Ico = slash.path(__dirname + '/../bin/Quick_Any2Ico.exe');
        if (false) {
            return childp.exec("\"" + any2Ico + "\" -formats=512 -res=\"" + appPath + "\" -icon=\"" + pngPath + "\"", opt, function(err, stdout, stderr) {
                if (!err) {
                    return opt.cb(pngPath, opt.cbArg);
                } else {
                    if (slash.ext(appPath) !== 'lnk') {
                        kerror(stdout, stderr, err);
                    }
                    return ExeIcon.brokenIcon(opt);
                }
            });
        } else {
            wxw = require('wxw');
            wxw('icon', appPath, pngPath);
            return opt.cb(pngPath, opt.cbArg);
        }
    };

    ExeIcon.saveIconData = function(data, opt) {
        var pngPath;
        pngPath = ExeIcon.pngPath(opt);
        return fs.writeFile(pngPath, data, function(err) {
            if (err == null) {
                return opt.cb(pngPath, opt.cbArg);
            } else {
                kerror("saveIconData: " + err);
                return ExeIcon.brokenIcon(opt);
            }
        });
    };

    ExeIcon.saveIconBase64 = function(data, opt) {
        var pngPath;
        pngPath = ExeIcon.pngPath(opt);
        return fs.writeFile(pngPath, data, {
            encoding: 'base64'
        }, function(err) {
            if (err == null) {
                return opt.cb(pngPath, opt.cbArg);
            } else {
                kerror("saveIconBase64: " + err);
                return ExeIcon.brokenIcon(opt);
            }
        });
    };

    ExeIcon.brokenIcon = function(opt) {
        var brokenPath;
        brokenPath = slash.join(__dirname, '..', 'img', 'broken.png');
        return opt.cb(brokenPath, opt.cbArg);
    };

    return ExeIcon;

})();

module.exports = ExeIcon;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlaWNvbi5qcyIsInNvdXJjZVJvb3QiOiIuIiwic291cmNlcyI6WyIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7OztBQUFBLElBQUE7O0FBUUEsTUFBNkMsT0FBQSxDQUFRLEtBQVIsQ0FBN0MsRUFBRSxpQkFBRixFQUFTLGlCQUFULEVBQWdCLFdBQWhCLEVBQW9CLG1CQUFwQixFQUE0QixtQkFBNUIsRUFBb0M7O0FBRTlCOzs7SUFFRixPQUFDLENBQUEsS0FBRCxHQUFTOztJQUVULE9BQUMsQ0FBQSxPQUFELEdBQVUsU0FBQyxHQUFEO2VBRU4sS0FBSyxDQUFDLE9BQU4sQ0FBYyxLQUFLLENBQUMsSUFBTixDQUFXLEdBQUcsQ0FBQyxPQUFmLEVBQXdCLEtBQUssQ0FBQyxJQUFOLENBQVcsR0FBRyxDQUFDLE9BQWYsQ0FBQSxHQUEwQixNQUFsRCxDQUFkO0lBRk07O0lBSVYsT0FBQyxDQUFBLEdBQUQsR0FBTSxTQUFDLEdBQUQ7QUFFRixZQUFBO1FBQUEsT0FBQSxHQUFVLE9BQU8sQ0FBQyxPQUFSLENBQWdCLEdBQWhCO1FBQ1YsSUFBRyxPQUFPLENBQUMsS0FBTSxDQUFBLE9BQUEsQ0FBakI7bUJBQ0ksR0FBRyxDQUFDLEVBQUosQ0FBTyxPQUFQLEVBQWdCLEdBQUcsQ0FBQyxLQUFwQixFQURKO1NBQUEsTUFBQTttQkFHSSxFQUFFLENBQUMsSUFBSCxDQUFRLE9BQVIsRUFBaUIsU0FBQyxHQUFELEVBQU0sSUFBTjtnQkFDYixJQUFPLGFBQUosSUFBYSxJQUFJLENBQUMsTUFBTCxDQUFBLENBQWhCO29CQUNJLE9BQU8sQ0FBQyxLQUFNLENBQUEsT0FBQSxDQUFkLEdBQXlCOzJCQUN6QixHQUFHLENBQUMsRUFBSixDQUFPLE9BQVAsRUFBZ0IsR0FBRyxDQUFDLEtBQXBCLEVBRko7aUJBQUEsTUFBQTsyQkFJSSxPQUFPLENBQUMsT0FBUixDQUFnQixHQUFoQixFQUpKOztZQURhLENBQWpCLEVBSEo7O0lBSEU7O0lBYU4sT0FBQyxDQUFBLE9BQUQsR0FBVSxTQUFDLEdBQUQ7QUFFTixZQUFBO1FBQUEsT0FBQSxHQUFVLEtBQUssQ0FBQyxPQUFOLENBQWMsR0FBRyxDQUFDLE9BQWxCO1FBQ1YsT0FBQSxHQUFVLE9BQU8sQ0FBQyxPQUFSLENBQWdCLEdBQWhCO1FBRVYsSUFBQSxDQUFLLFNBQUwsRUFBZ0IsT0FBaEIsRUFBeUIsT0FBekI7UUFFQSxPQUFBLEdBQVUsS0FBSyxDQUFDLElBQU4sQ0FBVyxTQUFBLEdBQVksMkJBQXZCO1FBRVYsSUFBRyxLQUFIO21CQUVJLE1BQU0sQ0FBQyxJQUFQLENBQVksSUFBQSxHQUFLLE9BQUwsR0FBYSx5QkFBYixHQUFzQyxPQUF0QyxHQUE4QyxhQUE5QyxHQUEyRCxPQUEzRCxHQUFtRSxJQUEvRSxFQUFvRixHQUFwRixFQUF5RixTQUFDLEdBQUQsRUFBSyxNQUFMLEVBQVksTUFBWjtnQkFDckYsSUFBRyxDQUFJLEdBQVA7MkJBRUksR0FBRyxDQUFDLEVBQUosQ0FBTyxPQUFQLEVBQWdCLEdBQUcsQ0FBQyxLQUFwQixFQUZKO2lCQUFBLE1BQUE7b0JBSUksSUFBRyxLQUFLLENBQUMsR0FBTixDQUFVLE9BQVYsQ0FBQSxLQUFxQixLQUF4Qjt3QkFDSSxNQUFBLENBQU8sTUFBUCxFQUFlLE1BQWYsRUFBdUIsR0FBdkIsRUFESjs7MkJBRUEsT0FBTyxDQUFDLFVBQVIsQ0FBbUIsR0FBbkIsRUFOSjs7WUFEcUYsQ0FBekYsRUFGSjtTQUFBLE1BQUE7WUFZSSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVI7WUFDTixHQUFBLENBQUksTUFBSixFQUFXLE9BQVgsRUFBb0IsT0FBcEI7bUJBQ0EsR0FBRyxDQUFDLEVBQUosQ0FBTyxPQUFQLEVBQWdCLEdBQUcsQ0FBQyxLQUFwQixFQWRKOztJQVRNOztJQXlCVixPQUFDLENBQUEsWUFBRCxHQUFlLFNBQUMsSUFBRCxFQUFPLEdBQVA7QUFFWCxZQUFBO1FBQUEsT0FBQSxHQUFVLE9BQU8sQ0FBQyxPQUFSLENBQWdCLEdBQWhCO2VBQ1YsRUFBRSxDQUFDLFNBQUgsQ0FBYSxPQUFiLEVBQXNCLElBQXRCLEVBQTRCLFNBQUMsR0FBRDtZQUN4QixJQUFPLFdBQVA7dUJBQ0ksR0FBRyxDQUFDLEVBQUosQ0FBTyxPQUFQLEVBQWdCLEdBQUcsQ0FBQyxLQUFwQixFQURKO2FBQUEsTUFBQTtnQkFHSSxNQUFBLENBQU8sZ0JBQUEsR0FBaUIsR0FBeEI7dUJBQ0EsT0FBTyxDQUFDLFVBQVIsQ0FBbUIsR0FBbkIsRUFKSjs7UUFEd0IsQ0FBNUI7SUFIVzs7SUFVZixPQUFDLENBQUEsY0FBRCxHQUFpQixTQUFDLElBQUQsRUFBTyxHQUFQO0FBRWIsWUFBQTtRQUFBLE9BQUEsR0FBVSxPQUFPLENBQUMsT0FBUixDQUFnQixHQUFoQjtlQUNWLEVBQUUsQ0FBQyxTQUFILENBQWEsT0FBYixFQUFzQixJQUF0QixFQUE0QjtZQUFDLFFBQUEsRUFBVSxRQUFYO1NBQTVCLEVBQWtELFNBQUMsR0FBRDtZQUM5QyxJQUFPLFdBQVA7dUJBQ0ksR0FBRyxDQUFDLEVBQUosQ0FBTyxPQUFQLEVBQWdCLEdBQUcsQ0FBQyxLQUFwQixFQURKO2FBQUEsTUFBQTtnQkFHSSxNQUFBLENBQU8sa0JBQUEsR0FBbUIsR0FBMUI7dUJBQ0EsT0FBTyxDQUFDLFVBQVIsQ0FBbUIsR0FBbkIsRUFKSjs7UUFEOEMsQ0FBbEQ7SUFIYTs7SUFVakIsT0FBQyxDQUFBLFVBQUQsR0FBYSxTQUFDLEdBQUQ7QUFFVCxZQUFBO1FBQUEsVUFBQSxHQUFhLEtBQUssQ0FBQyxJQUFOLENBQVcsU0FBWCxFQUFzQixJQUF0QixFQUE0QixLQUE1QixFQUFtQyxZQUFuQztlQUNiLEdBQUcsQ0FBQyxFQUFKLENBQU8sVUFBUCxFQUFtQixHQUFHLENBQUMsS0FBdkI7SUFIUzs7Ozs7O0FBS2pCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiIyMjXG4wMDAwMDAwICAwMDAgICAwMDAgIDAwMDAwMDAwICAwMDAgICAwMDAwMDAwICAgMDAwMDAwMCAgIDAwMCAgIDAwMCAgXG4wMCAgICAgICAgMDAwIDAwMCAgIDAwMCAgICAgICAwMDAgIDAwMCAgICAgICAwMDAgICAwMDAgIDAwMDAgIDAwMCAgXG4wMDAwMDAgICAgIDAwMDAwICAgIDAwMDAwMDAgICAwMDAgIDAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAwIDAwMCAgXG4wMCAgICAgICAgMDAwIDAwMCAgIDAwMCAgICAgICAwMDAgIDAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAgMDAwMCAgXG4wMDAwMDAwICAwMDAgICAwMDAgIDAwMDAwMDAwICAwMDAgICAwMDAwMDAwICAgMDAwMDAwMCAgIDAwMCAgIDAwMCAgXG4jIyNcblxueyBzbGFzaCwgZW1wdHksIGZzLCBjaGlsZHAsIGtlcnJvciwga2xvZyB9ID0gcmVxdWlyZSAna3hrJ1xuICAgIFxuY2xhc3MgRXhlSWNvblxuICAgIFxuICAgIEBjYWNoZSA9IHt9XG4gICAgXG4gICAgQHBuZ1BhdGg6IChvcHQpIC0+XG4gICAgICAgIFxuICAgICAgICBzbGFzaC5yZXNvbHZlIHNsYXNoLmpvaW4gb3B0Lmljb25EaXIsIHNsYXNoLmJhc2Uob3B0LmFwcFBhdGgpICsgXCIucG5nXCJcblxuICAgIEBnZXQ6IChvcHQpIC0+XG4gICAgICAgIFxuICAgICAgICBwbmdQYXRoID0gRXhlSWNvbi5wbmdQYXRoIG9wdFxuICAgICAgICBpZiBFeGVJY29uLmNhY2hlW3BuZ1BhdGhdXG4gICAgICAgICAgICBvcHQuY2IgcG5nUGF0aCwgb3B0LmNiQXJnXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGZzLnN0YXQgcG5nUGF0aCwgKGVyciwgc3RhdCkgLT5cbiAgICAgICAgICAgICAgICBpZiBub3QgZXJyPyBhbmQgc3RhdC5pc0ZpbGUoKVxuICAgICAgICAgICAgICAgICAgICBFeGVJY29uLmNhY2hlW3BuZ1BhdGhdID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICBvcHQuY2IgcG5nUGF0aCwgb3B0LmNiQXJnXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBFeGVJY29uLmdldEljb24gb3B0XG4gICAgICAgICAgICAgICAgICAgIFxuICAgIEBnZXRJY29uOiAob3B0KSAtPlxuICAgICAgICBcbiAgICAgICAgYXBwUGF0aCA9IHNsYXNoLnJlc29sdmUgb3B0LmFwcFBhdGhcbiAgICAgICAgcG5nUGF0aCA9IEV4ZUljb24ucG5nUGF0aCBvcHRcbiAgICAgICAgXG4gICAgICAgIGtsb2cgJ2dldEljb24nLCBhcHBQYXRoLCBwbmdQYXRoXG4gICAgICAgIFxuICAgICAgICBhbnkySWNvID0gc2xhc2gucGF0aCBfX2Rpcm5hbWUgKyAnLy4uL2Jpbi9RdWlja19BbnkySWNvLmV4ZSdcbiAgICAgICAgXG4gICAgICAgIGlmIGZhbHNlICNzbGFzaC5pc0ZpbGUgYW55Mkljb1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjaGlsZHAuZXhlYyBcIlxcXCIje2FueTJJY299XFxcIiAtZm9ybWF0cz01MTIgLXJlcz1cXFwiI3thcHBQYXRofVxcXCIgLWljb249XFxcIiN7cG5nUGF0aH1cXFwiXCIsIG9wdCwgKGVycixzdGRvdXQsc3RkZXJyKSAtPiBcbiAgICAgICAgICAgICAgICBpZiBub3QgZXJyIFxuICAgICAgICAgICAgICAgICAgICAjIGxvZyBzdGRvdXRcbiAgICAgICAgICAgICAgICAgICAgb3B0LmNiIHBuZ1BhdGgsIG9wdC5jYkFyZ1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgaWYgc2xhc2guZXh0KGFwcFBhdGgpIT0gJ2xuaydcbiAgICAgICAgICAgICAgICAgICAgICAgIGtlcnJvciBzdGRvdXQsIHN0ZGVyciwgZXJyXG4gICAgICAgICAgICAgICAgICAgIEV4ZUljb24uYnJva2VuSWNvbiBvcHRcblxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB3eHcgPSByZXF1aXJlICd3eHcnXG4gICAgICAgICAgICB3eHcgJ2ljb24nIGFwcFBhdGgsIHBuZ1BhdGhcbiAgICAgICAgICAgIG9wdC5jYiBwbmdQYXRoLCBvcHQuY2JBcmdcbiAgICAgICAgICAgICAgICBcbiAgICBAc2F2ZUljb25EYXRhOiAoZGF0YSwgb3B0KSAtPlxuICAgICAgICBcbiAgICAgICAgcG5nUGF0aCA9IEV4ZUljb24ucG5nUGF0aCBvcHRcbiAgICAgICAgZnMud3JpdGVGaWxlIHBuZ1BhdGgsIGRhdGEsIChlcnIpIC0+XG4gICAgICAgICAgICBpZiBub3QgZXJyP1xuICAgICAgICAgICAgICAgIG9wdC5jYiBwbmdQYXRoLCBvcHQuY2JBcmdcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBrZXJyb3IgXCJzYXZlSWNvbkRhdGE6ICN7ZXJyfVwiXG4gICAgICAgICAgICAgICAgRXhlSWNvbi5icm9rZW5JY29uIG9wdFxuXG4gICAgQHNhdmVJY29uQmFzZTY0OiAoZGF0YSwgb3B0KSAtPlxuICAgICAgICBcbiAgICAgICAgcG5nUGF0aCA9IEV4ZUljb24ucG5nUGF0aCBvcHRcbiAgICAgICAgZnMud3JpdGVGaWxlIHBuZ1BhdGgsIGRhdGEsIHtlbmNvZGluZzogJ2Jhc2U2NCd9LCAoZXJyKSAtPlxuICAgICAgICAgICAgaWYgbm90IGVycj9cbiAgICAgICAgICAgICAgICBvcHQuY2IgcG5nUGF0aCwgb3B0LmNiQXJnXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAga2Vycm9yIFwic2F2ZUljb25CYXNlNjQ6ICN7ZXJyfVwiXG4gICAgICAgICAgICAgICAgRXhlSWNvbi5icm9rZW5JY29uIG9wdFxuICAgICAgICAgICAgICAgIFxuICAgIEBicm9rZW5JY29uOiAob3B0KSAtPlxuICAgICAgICBcbiAgICAgICAgYnJva2VuUGF0aCA9IHNsYXNoLmpvaW4gX19kaXJuYW1lLCAnLi4nLCAnaW1nJywgJ2Jyb2tlbi5wbmcnXG4gICAgICAgIG9wdC5jYiBicm9rZW5QYXRoLCBvcHQuY2JBcmdcbiAgICAgICAgXG5tb2R1bGUuZXhwb3J0cyA9IEV4ZUljb25cbiJdfQ==
//# sourceURL=../coffee/exeicon.coffee