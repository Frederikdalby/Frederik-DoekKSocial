const SDK = {
    serverURL: "http://localhost:8080/api",
    request: (options, cb) => {

        let token = {
            "authorization": sessionStorage.getItem("token")
        };
// Inspiration fra Jesper "javascript-client"
        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: token,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(SDK.Encryption.encrypt(JSON.stringify(options.data))),
            success: (data, status, xhr) => {
                cb(null, SDK.Encryption.decrypt(data), status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        })
    },


    User: {

        login: (email, password, cb) => {
            SDK.request({
                    data: {
                        email: email,
                        password: password
                    },
                    url: "/login",
                    method: "POST"
                },
                (err, data) => {
                    if (err) return cb(err);

                    sessionStorage.setItem("token", JSON.parse(data));

                    cb(null, data);

                });

        },

        loadCurrentUser: (cb) => {
            SDK.request({
                method: "GET",
                url: "/students/profile",
                headers: {
                    authorization: sessionStorage.getItem("token"),
                },
            }, (err, user) => {
                if (err) return cb(err);
                sessionStorage.setItem("student", user);
                cb(null, user);


            });

        },

        createUser: (firstName, lastName, email, password, verifyPassword, cb) => {
            SDK.request({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    verifyPassword: verifyPassword
                },
                method: "POST",
                url: "/register"
            }, (err, data) => {
                if (err) return cb(err);
                cb(null, data);

            });
        },

    },


    logout: (cb) => {
        SDK.request({
            method: "POST",
            url: "/students/logout"
        }, (err, data) => {
            if (err) {
                return cb(err);

            }
            cb(null, data);

        });
    },


    Event: {

        allEvents: (cb, events) => {
            SDK.request({
                method: "GET",
                url: "events",
                headers: {
                    filter: {
                        include: ["events"]
                    }


                }
            }, cb);


        },

        joinEvent: (idEvent, eventName, location, price, eventDate, description, cb) => {
            SDK.request({
                data: {
                    idEvent: idEvent,
                    eventName: eventName,
                    price: price,
                    location: location,
                    description: description,
                    eventDate: eventDate
                },
                method: "POST",
                url: "/events/join",

            }, (err, data) => {
                if (err)
                    return cb(err);
                cb(null, data);

            });
        },

        attendingStudents: (idEvent, cb) => {
            SDK.request({
                method: "GET",
                url: "/events/" + idEvent + "/students",
                headers: {
                    authorization: sessionStorage.getItem("token"),
                },
            }, (err, event) => {
                if (err) return cb(err);
                cb(null, event)
            });

        },

        createEvent: (eventName, location, price, eventDate, description, cb) => {
            SDK.request({
                data: {
                    eventName: eventName,
                    location: location,
                    price: price,
                    eventDate: eventDate,
                    description: description

                },
                method: "POST",
                url: "/events",
                headers: {
                    authorization: sessionStorage.getItem("token")
                },
            }, (err, data) => {
                if (err) {
                    return cb(err);
                }
                cb(null, data);
            });

        },


        deleteEvent: (idEvent, eventName, location, price, eventDate, description, cb) => {
            SDK.request({
                data: {
                    idEvent: idEvent,
                    eventName: eventName,
                    location: location,
                    price: price,
                    eventDate: eventDate,
                    description: description,
                },
                method: "PUT",
                url: "/events/" + idEvent + "/delete-event",
            }, cb);
        },

        updateEvent: (eventName, location, eventDate, description, price, idEvent, cb) => {
            SDK.request({
                data: {
                    eventName: eventName,
                    location: location,
                    eventDate: eventDate,
                    description: description,
                    price: price

                },
                method: "PUT",
                url: "/events/" + idEvent + "/update-event",
            }, (err, data) => {
                if (err) return cb(err);

                SDK.Storage.persist("crypted", data);

                call(null, data);
            });
        },

        attendingEvents: (cb, events) => {
            SDK.request({
                method: "GET",
                url: "/students/" + localStorage.getItem("idStudent") + "/events",
            }, cb);
        },
    },

    Encryption: {
        encrypt: (encrypt) => {
            if (encrypt !== undefined && encrypt.length !== 0) {
                const fields = ['J', 'M', 'F'];
                let encrypted = '';
                for (let i = 0; i < encrypt.length; i++) {
                    encrypted += (String.fromCharCode((encrypt.charAt(i)).charCodeAt(0) ^ (fields[i % fields.length]).charCodeAt(0)))
                }
                return encrypted;
            } else {
                return encrypt;
            }
        },
        decrypt: (decrypt) => {
            if (decrypt.length > 0 && decrypt !== undefined) {
                const fields = ['J', 'M', 'F'];
                let decrypted = '';
                for (let i = 0; i < decrypt.length; i++) {
                    decrypted += (String.fromCharCode((decrypt.charAt(i)).charCodeAt(0) ^ (fields[i % fields.length]).charCodeAt(0)))
                }
                return decrypted;
            } else {
                return decrypt;
            }
        },

    Storage: {
            prefix: "doekSDK",
        persist: (key, value) => {
                window.sessionStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
        },
        load: (key) => {
            const val = window.sessionStorage.getItem(SDK.Storage.prefix + key);
            try {
                return JSON.parse(val);
            }
            catch (e) {
                return val;
            }
        },
        remove: (key) => {
            window.sessionStorage.removeItem(SDK.Storage.prefix + key);
        },

    },



    },

};








