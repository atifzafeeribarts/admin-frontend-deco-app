import React from 'react'

const Timeline = ({timelineEntries}) => {
    return (
        <section className="py-12">
            <div className="text-[var(--text-color)] text-lg font-semibold mb-4 uppercase">
                Return History
            </div>
            <div className="at-return-card ">
                <div className="mb-6">
                    <textarea
                        className="w-full border-2 border-[var(--border-color)] rounded-lg p-2 text-sm"
                        placeholder="Leave a note"
                    />
                    <button className="at-dark-btn text-sm px-6 py-2 mt-2 uppercase">
                        Post
                    </button>
                </div>
                {timelineEntries.map((entry, index) => (
                    <div key={index} className="mb-5 flex flex-col gap-3">
                        <div className="text-[var(--dark-light-brown)] font-medium mb-2">
                            {entry.date}
                        </div>
                        {entry.events.map((event, idx) => (
                            <div
                                key={idx}
                                className="flex gap-2 justify-between items-start text-sm"
                            >
                                <p className="text-[var(--text-color)] w-[75%]">
                                    {event.description}
                                </p>
                                <span className="text-[var(--dark-light-brown)]">
                                    {event.time}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Timeline